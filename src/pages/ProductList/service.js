import request from '../../utils/request';

export async function queryProducts() {
    return request('/api/GetProducts');
}

export async function addProduct(newProduct) {
    return request('/api/PostProduct', {
        method: 'POST',
        data: { ...newProduct, method: 'create' },
    });
}

export async function editProduct(editedProduct) {
    return request('/api/PostProduct', {
        method: 'POST',
        data: { ...editedProduct, method: 'edit' },
    });
}
