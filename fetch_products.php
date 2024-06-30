<?php
require_once 'Product.php';

$product = new Product();

$categoryId = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;
$orderBy = isset($_GET['order_by']) ? $_GET['order_by'] : null;

$products = $product->getProducts($categoryId, $orderBy);

echo json_encode($products);
