const generateList = (current, pageSize) => {
    const dataSource = [];
    const typeOptions = ["Hardware", "Software"]

    for (let i = 0; i < pageSize; i += 1) {
        const index = (current - 1) * 10 + i;
        dataSource.push({
            key: index + 1,
            name: `Item ${index + 1}`,
            unitPrice: Math.floor(Math.random() * 10000) / 100,
            type: typeOptions[Math.floor(Math.random() * typeOptions.length)],
            description: "description",
        });
    }

    dataSource.reverse();
    return dataSource;
};

let dataSource = generateList(1, 100);

function postProduct(req, res, b) {
    const body = (b && b.body) || req.body;
    const { method, key, name, unitPrice, type, description } = body;

    switch (method) {
        case 'create':
            (() => {
                if (
                    name == null ||
                    unitPrice == null ||
                    type == null ||
                    !(type == "Hardware" || type == "Software") ||
                    description.length > 200
                ) {
                    return res.json({ "isSuccess": false, "message": "Invalid product details." });
                };
                const newProduct = {
                    key: dataSource.length + 1,
                    name,
                    unitPrice,
                    type,
                    description,
                };
                dataSource.unshift(newProduct);
                return res.json({ "isSuccess": true });
            })();
            break;

        case 'edit':
            (() => {
                if (
                    key == null ||
                    name == null ||
                    unitPrice == null ||
                    type == null ||
                    !(type == "Hardware" || type == "Software") ||
                    description.length > 200
                ) {
                    return res.json({ "isSuccess": false, "message": "Invalid product details." });
                };
                const index = dataSource.findIndex(product => product.key === key);
                const editedProduct = {
                    ...dataSource[index],
                    key,
                    name,
                    unitPrice,
                    type,
                    description,
                };
                dataSource.splice(index, 1, editedProduct);
                return res.json({ "isSuccess": true });
            })();
            break;

        default:
            break;
    }
}

export default {
    'GET /api/GetProducts': dataSource,
    'POST /api/PostProduct': postProduct,
};
