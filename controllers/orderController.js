import fs from "fs";
import path from "path";
import { successResponse } from "../utils/common.js";
import pdfKit from "pdfkit";
import Order from "../models/order.js";

class orderController {
  static index(req, res, next) {
    Order.find({ "user.userId": req.user._id })
      .then((orders) => successResponse(res, orders))
      .catch((exception) => next(new Error(exception)));
  }

  static downloadInvoice(req, res, next) {
    const orderId = req.params.id;
    const fileName = `${orderId}.pdf`;
    const invoicePath = path.join("data", "invoices", fileName);

    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return next(new Error("Order not found"));
        }

        if (order.user.userId.toString() !== req.user._id.toString()) {
          return next(new Error("Unauthorized"));
        }

        // unoptimized download - can overflow RAM
        // fs.readFile(invoicePath, (err, data) => {
        //   if (err) {
        //     return next(err);
        //   }

        //   res.setHeader("Content-Type", "application/pdf");
        //   res.setHeader(
        //     "Content-Disposition",
        //     'inline; filename="' + fileName + '"'
        //   );

        //   res.send(data);
        // });

        // in stream - optimized version of downloading file
        // const file = fs.createReadStream(invoicePath);

        // res.setHeader("Content-Type", "application/pdf");
        // res.setHeader(
        //   "Content-Disposition",
        //   'inline; filename="' + fileName + '"'
        // );

        // file.pipe(res);

        // generate custom PDF
        const pdfDocument = new pdfKit();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          'inline; filename="' + fileName + '"'
        );

        pdfDocument.pipe(fs.createWriteStream(invoicePath));
        pdfDocument.pipe(res);

        order.products.forEach((p) => {
          pdfDocument.text(`
            ${p.product.title} | ${p.quantity}ks | ${p.product.price}€
          `);
        });

        pdfDocument.end();
      })
      .catch((exception) => next(exception));
  }
}

export default orderController;
