<?php
require_once 'Category.php';

$category = new Category();

$categories = $category->getCategories();

echo json_encode($categories);
