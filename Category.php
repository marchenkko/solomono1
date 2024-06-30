<?php
require_once 'database.php';

class Category
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->conn;
    }

    public function getCategories()
    {
        $sql = "SELECT categories.id, categories.name, COUNT(products.id) AS product_count
                FROM categories
                LEFT JOIN products ON categories.id = products.category_id
                GROUP BY categories.id";
        $result = $this->conn->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
