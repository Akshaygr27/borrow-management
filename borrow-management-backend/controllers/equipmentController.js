const Equipment = require("../models/Equipment");

exports.createEquipment = async (
  req,
  res
) => {
  try {
    const {
      equipmentName,
      category,
      serialNumber,
      availableQuantity,
      status
    } = req.body;

    const existingEquipment =
      await Equipment.findOne({
        serialNumber
      });

    if (existingEquipment) {
      return res.status(409).json({
        success: false,
        message:
          "Serial number already exists"
      });
    }

    const equipment =
      await Equipment.create({
        equipmentName,
        category,
        serialNumber,
        availableQuantity,
        status
      });

    return res.status(201).json({
      success: true,
      message:
        "Equipment created successfully",
      data: equipment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getEquipments = async (
  req,
  res
) => {
  try {

    let {
      page = 1,
      limit = 10,
      search = "",
      status,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    // Search
    if (search) {
      query.$or = [
        {
          equipmentName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          category: {
            $regex: search,
            $options: "i"
          }
        },
        {
          serialNumber: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const totalRecords =
      await Equipment.countDocuments(query);

    const equipments =
      await Equipment.find(query)
        .sort({
          [sortBy]:
            sortOrder === "asc" ? 1 : -1
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
      count: equipments.length,
      data: equipments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getEquipmentById = async (
  req,
  res
) => {
  try {
    const equipment =
      await Equipment.findById(
        req.params.id
      );

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message:
          "Equipment not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: equipment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateEquipment = async (
  req,
  res
) => {
  try {
    const equipmentId =
      req.params.id;

    const { serialNumber } =
      req.body;

    if (serialNumber) {
      const duplicate =
        await Equipment.findOne({
          serialNumber,
          _id: { $ne: equipmentId }
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Serial number already exists"
        });
      }
    }

    const updatedEquipment =
      await Equipment.findByIdAndUpdate(
        equipmentId,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!updatedEquipment) {
      return res.status(404).json({
        success: false,
        message:
          "Equipment not found"
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Equipment updated successfully",
      data: updatedEquipment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteEquipment = async (
  req,
  res
) => {
  try {
    const deletedEquipment =
      await Equipment.findByIdAndDelete(
        req.params.id
      );

    if (!deletedEquipment) {
      return res.status(404).json({
        success: false,
        message:
          "Equipment not found"
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Equipment deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};