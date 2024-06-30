<?php
require_once 'Product.php';

$product = new Product();

$productId = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($productId) {
    $productDetails = $product->getProductDetails($productId);
    echo json_encode($productDetails);
}