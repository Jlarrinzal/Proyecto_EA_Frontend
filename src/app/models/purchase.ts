//Interfaz de Purchase
export interface Purchase {
    _id: string,
    user: string;
    product: string;
    quantity: number;
}