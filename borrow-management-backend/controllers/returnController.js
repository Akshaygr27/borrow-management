const mongoose = require("mongoose");

const Equipment = require("../models/Equipment");

const BorrowTransaction = require("../models/BorrowTransaction");

exports.returnEquipment =
  async (req, res) => {

    const session =
      await mongoose.startSession();

    try {

      session.startTransaction();

      const {
        transaction,
        returnDate
      } = req.body;

      const borrowTransaction =
        await BorrowTransaction
          .findById(transaction)
          .session(session);

      if (!borrowTransaction) {

        await session.abortTransaction();

        return res.status(404).json({
          success: false,
          message:
            "Transaction not found"
        });
      }

      if (
        borrowTransaction.status ===
        "Returned"
      ) {

        await session.abortTransaction();

        return res.status(400).json({
          success: false,
          message:
            "Equipment already returned"
        });
      }

      const equipment =
        await Equipment.findById(
          borrowTransaction.equipment
        ).session(session);

      if (!equipment) {

        await session.abortTransaction();

        return res.status(404).json({
          success: false,
          message:
            "Equipment not found"
        });
      }

      equipment.availableQuantity +=
        borrowTransaction.quantity;

      if (
        equipment.availableQuantity > 0
      ) {
        equipment.status =
          "Available";
      }

      await equipment.save({
        session
      });

      borrowTransaction.returnDate =
        returnDate;

      borrowTransaction.status =
        "Returned";

      await borrowTransaction.save({
        session
      });

      await session.commitTransaction();

      return res.status(200).json({
        success: true,
        message:
          "Equipment returned successfully",
        data: borrowTransaction
      });

    } catch (error) {

      await session.abortTransaction();

      return res.status(500).json({
        success: false,
        message: error.message
      });

    } finally {

      session.endSession();

    }
  };