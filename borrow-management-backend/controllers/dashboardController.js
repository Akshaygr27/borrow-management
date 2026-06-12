const Equipment = require("../models/Equipment");
const Borrower = require("../models/Borrower");
const BorrowTransaction = require("../models/BorrowTransaction");

exports.getDashboardStats =
  async (req, res) => {
    try {

      const [
        equipmentStats,
        borrowerStats,
        activeBorrowings,
        returnedItems,
        availableEquipment
      ] = await Promise.all([

        Equipment.aggregate([
          {
            $group: {
              _id: null,
              totalEquipment: {
                $sum: 1
              }
            }
          }
        ]),

        Borrower.aggregate([
          {
            $group: {
              _id: null,
              totalBorrowers: {
                $sum: 1
              }
            }
          }
        ]),

        BorrowTransaction.aggregate([
          {
            $match: {
              status: "Active"
            }
          },
          {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }
        ]),

        BorrowTransaction.aggregate([
          {
            $match: {
              status: "Returned"
            }
          },
          {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }
        ]),

        Equipment.aggregate([
          {
            $match: {
              availableQuantity: {
                $gt: 0
              }
            }
          },
          {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }
        ])

      ]);

      return res.status(200).json({
        success: true,

        data: {
          totalEquipment:
            equipmentStats[0]
              ?.totalEquipment || 0,

          totalBorrowers:
            borrowerStats[0]
              ?.totalBorrowers || 0,

          activeBorrowings:
            activeBorrowings[0]
              ?.count || 0,

          returnedItems:
            returnedItems[0]
              ?.count || 0,

          equipmentCurrentlyAvailable:
            availableEquipment[0]
              ?.count || 0
        }
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };