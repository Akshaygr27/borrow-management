const mongoose =
  require("mongoose");

const Borrower =
  require("../models/Borrower");

const Equipment =
  require("../models/Equipment");

const BorrowTransaction =
  require(
    "../models/BorrowTransaction"
  );

exports.createBorrowTransaction =
  async (req, res) => {

    const session =
      await mongoose.startSession();

    try {

      session.startTransaction();

      const {
        borrower,
        equipment,
        quantity,
        borrowDate,
        expectedReturnDate
      } = req.body;

      const borrowerData =
        await Borrower.findById(
          borrower
        ).session(session);

      if (!borrowerData) {

        await session.abortTransaction();

        return res.status(404).json({
          success: false,
          message:
            "Borrower not found"
        });
      }

      const equipmentData =
        await Equipment.findById(
          equipment
        ).session(session);

      if (!equipmentData) {

        await session.abortTransaction();

        return res.status(404).json({
          success: false,
          message:
            "Equipment not found"
        });
      }

      if (
        equipmentData.availableQuantity <
        quantity
      ) {

        await session.abortTransaction();

        return res.status(400).json({
          success: false,
          message:
            "Requested quantity exceeds available quantity"
        });
      }

      equipmentData.availableQuantity -=
        quantity;

      if (
        equipmentData.availableQuantity ===
        0
      ) {
        equipmentData.status =
          "Unavailable";
      }

      await equipmentData.save({
        session
      });

      const transaction =
        await BorrowTransaction.create(
          [
            {
              borrower,
              equipment,
              quantity,
              borrowDate,
              expectedReturnDate,
              status: "Active"
            }
          ],
          {
            session
          }
        );

      await session.commitTransaction();

      return res.status(201).json({
        success: true,
        message:
          "Equipment issued successfully",
        data: transaction[0]
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


  exports.getTransactions =
  async (req, res) => {
    try {

      const transactions =
        await BorrowTransaction.find()
          .populate(
            "borrower",
            "name email"
          )
          .populate(
            "equipment",
            "equipmentName serialNumber"
          )
          .sort({
            createdAt: -1
          });

      return res.status(200).json({
        success: true,
        data: transactions
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };


  exports.getTransactionById =
  async (req, res) => {
    try {

      const transaction =
        await BorrowTransaction
          .findById(req.params.id)
          .populate(
            "borrower",
            "name email"
          )
          .populate(
            "equipment",
            "equipmentName serialNumber"
          );

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message:
            "Transaction not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: transaction
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };