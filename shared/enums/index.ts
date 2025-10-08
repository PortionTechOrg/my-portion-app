export const Status = {
    Pending: 'pending',
    Delivered: 'delivered',
    Paid: 'paid',
    Completed: 'completed',
    Cancelled: 'cancelled'
} as const;

export const TransactionTypes = {
    Payment: "payment",
    Payout: "payout",
    Refund: "refund",
    Deposit: "Deposit"
} as const 


export type Status = (typeof Status)[keyof typeof Status];
export type TransactionTypes = (typeof TransactionTypes)[keyof typeof TransactionTypes];

export const quantity_unit = {
    KG: 'kg'
} as const;

export const ProductStockType = {
    Kg: "Kg",
    Pack: "Pack",
    Bunch: "Bunch",
    Tubers: "Tubers",
    Pieces: "Pieces",
    Bag: "Bag",
    Bucket: "Bucket",
    Congo: "Congo"
} as const;

export const ProductCategory = {
    GrainsAndCereals: 'Grains & Cereals',
    TubersAndRootCrops: 'Tubers & Root Crops',
    LegumesAndBeans: 'Legumes & Beans',
    Vegetables: 'Vegetables',
    Fruits: 'Fruits',
    SpicesAndHerbs: 'Spices & Herbs',
    NutsAndSeeds: 'Nuts & Seeds',
    LivestockAndPoultry: 'Livestock & Poultry',
    FishAndSeafood: 'Fish & Seafood',
    DairyProducts: 'Dairy Products',
    ProcessedFoods: 'Processed Foods',
    OrganicProducts: 'Organic Products',
    FertilizersAndInputs: 'Fertilizers & Inputs',
    AgriculturalEquipment: 'Agricultural Equipment'
} as const;

export const Roles = {
    USER: "user",
    VENDOR: "vendor",
    ADMIN: "admin",
    SUBADMIN: "subadmin"
} as const;

export const NotificationType = {
    ORDER: "order",
    PAYMENT: "payment",
    PAYOUT: "payout",
    SYSTEM: "system",
    ALERT: "alert"
} as const;

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export type Roles = (typeof Roles)[keyof typeof Roles];

export const MailEvent = {
    userSignup : 'user:send-welcome-email',
    userLogin : 'user:send-login-email'
} as const;

export type MailEvent = (typeof MailEvent)[keyof typeof MailEvent];

