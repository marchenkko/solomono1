$(document).ready(function () {
    function loadCategories() {
        $.ajax({
            url: 'fetch_categories.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                let categoriesHtml = '';
                $.each(response, function (index, category) {
                    categoriesHtml += '<li class="list-group-item category" data-id="' + category.id + '">' +
                        category.name + ' (' + category.product_count + ')</li>';
                });
                $('#categories').html(categoriesHtml);
            }
        });
    }

    function loadProducts(categoryId = null, orderBy = null) {
        $.ajax({
            url: 'fetch_products.php',
            type: 'GET',
            data: {
                category_id: categoryId,
                order_by: orderBy
            },
            dataType: 'json',
            success: function (response) {
                let productsHtml = '';
                $.each(response, function (index, product) {
                    productsHtml += '<div class="product">' +
                        '<h5>' + product.name + '</h5>' +
                        '<p>Ціна: ' + product.price + '</p>' +
                        '<p>Дата: ' + product.date + '</p>' +
                        '<button class="btn btn-primary buy" data-id="' + product.id + '">Купити</button>' +
                        '</div>';
                });
                $('#products').html(productsHtml);
            }
        });
    }

    function updateURL(categoryId, orderBy) {
        let url = new URL(window.location.href);
        if (categoryId) {
            url.searchParams.set('category_id', categoryId);
        } else {
            url.searchParams.delete('category_id');
        }
        if (orderBy) {
            url.searchParams.set('order_by', orderBy);
        } else {
            url.searchParams.delete('order_by');
        }
        window.history.pushState({}, '', url);
    }

    function applyFromURL() {
        let urlParams = new URLSearchParams(window.location.search);
        let categoryId = urlParams.get('category_id');
        let orderBy = urlParams.get('order_by');

        if (categoryId) {
            $('.category[data-id="' + categoryId + '"]').addClass('active');
        }
        $('#sort').val(orderBy);

        loadProducts(categoryId, orderBy);
    }

    loadCategories();
    applyFromURL();

    $(document).on('click', '.category', function () {
        const categoryId = $(this).data('id');
        $('.category').removeClass('active');
        $(this).addClass('active');
        updateURL(categoryId, $('#sort').val());
        loadProducts(categoryId, $('#sort').val());
    });

    $('#sort').on('change', function () {
        const categoryId = $('.category.active').data('id');
        updateURL(categoryId, $(this).val());
        loadProducts(categoryId, $(this).val());
    });

    $(document).on('click', '.buy', function () {
        const productId = $(this).data('id');
        $.ajax({
            url: 'fetch_product_details.php',
            type: 'GET',
            data: {id: productId},
            dataType: 'json',
            success: function (response) {
                $('.modal-body').html('<h5>' + response.name + '</h5>' +
                    '<p>Ціна: ' + response.price + '</p>' +
                    '<p>Дата: ' + response.date + '</p>');
                $('#buyModal').modal('show');
            }
        });
    });

    window.onpopstate = function () {
        applyFromURL();
    };
});