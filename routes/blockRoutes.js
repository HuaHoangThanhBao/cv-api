const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController');

router
    .route('/')
    .get(blockController.getAllBlocks)
    .post(blockController.createBlock);

router
    .route('/:id')
    .get(blockController.getBlock)
    .patch(blockController.updateBlock)
    .delete(blockController.deleteBlock);
    
router.delete('/deleteMe', blockController.deleteMe);

module.exports = router;