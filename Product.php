<?php
require_once 'database.php';

class Product
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->conn;
    }

    public function getProducts($categoryId = null, $orderBy = null)
    {
        $sql = "SELECT * FROM products";
        $params = [];
        $types = "";

        if ($categoryId) {
            $sql .= " WHERE category_id = ?";
            $params[] = $categoryId;
            $types .= "i";
        }

        if ($orderBy) {
            if ($orderBy == 'price_asc') {
                $sql .= " ORDER BY price ASC";
            } elseif ($orderBy == 'name_asc') {
                $sql .= " ORDER BY name ASC";
            } elseif ($orderBy == 'date_desc') {
                $sql .= " ORDER BY date DESC";
            }
        }

        $stmt = $this->conn->prepare($sql);

        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProductDetails($productId)
    {
        $sql = "SELECT * FROM products WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $productId);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_assoc();
    }
}
