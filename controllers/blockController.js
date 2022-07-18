const Block = require('../models/blockModel');
const base = require('./baseController');

exports.deleteMe = async (req, res, next) => {
    try {
        const result = await Block.findByIdAndUpdate(req.block.id, {
            active: true,
        });

        res.status(204).json({
            status: 'success',
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
}

exports.getAllBlocks = base.getAll(Block);
exports.getBlock = base.getOne(Block);
exports.createBlock = base.createOne(Block);
exports.updateBlock = base.updateOne(Block);
exports.deleteBlock = base.deleteOne(Block);