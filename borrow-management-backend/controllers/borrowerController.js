const Borrower = require("../models/Borrower");

exports.createBorrower = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      department
    } = req.body;

    const existingBorrower =
      await Borrower.findOne({
        email
      });

    if (existingBorrower) {
      return res.status(409).json({
        success: false,
        message:
          "Email already exists"
      });
    }

    const borrower =
      await Borrower.create({
        name,
        email,
        phoneNumber,
        department
      });

    return res.status(201).json({
      success: true,
      message:
        "Borrower created successfully",
      data: borrower
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.getBorrowers = async (
  req,
  res
) => {
  try {

    let {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: search,
            $options: "i"
          }
        },
        {
          phoneNumber: {
            $regex: search,
            $options: "i"
          }
        },
        {
          department: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    const totalRecords =
      await Borrower.countDocuments(
        query
      );

    const borrowers =
      await Borrower.find(query)
        .sort({
          [sortBy]:
            sortOrder === "asc"
              ? 1
              : -1
        })
        .skip((page - 1) * limit)
        .limit(limit);

    return res.status(200).json({
      success: true,

      pagination: {
        currentPage: page,
        pageSize: limit,
        totalRecords,
        totalPages: Math.ceil(
          totalRecords / limit
        )
      },

      data: borrowers
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.getBorrowerById =
  async (req, res) => {
    try {

      const borrower =
        await Borrower.findById(
          req.params.id
        );

      if (!borrower) {
        return res.status(404).json({
          success: false,
          message:
            "Borrower not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: borrower
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };

exports.updateBorrower =
  async (req, res) => {
    try {

      const borrowerId =
        req.params.id;

      const { email } = req.body;

      if (email) {

        const existingBorrower =
          await Borrower.findOne({
            email,
            _id: {
              $ne: borrowerId
            }
          });

        if (existingBorrower) {
          return res.status(409).json({
            success: false,
            message:
              "Email already exists"
          });
        }
      }

      const borrower =
        await Borrower.findByIdAndUpdate(
          borrowerId,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!borrower) {
        return res.status(404).json({
          success: false,
          message:
            "Borrower not found"
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Borrower updated successfully",
        data: borrower
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };

exports.deleteBorrower =
  async (req, res) => {
    try {

      const borrower =
        await Borrower.findByIdAndDelete(
          req.params.id
        );

      if (!borrower) {
        return res.status(404).json({
          success: false,
          message:
            "Borrower not found"
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Borrower deleted successfully"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };