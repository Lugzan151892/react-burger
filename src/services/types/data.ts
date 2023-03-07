import { LegacyRef, ReactNode } from "react";

export type TIngridient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId?: string;
    amount?: number;
}

export type TIngridientWithUID = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId: string;
    amount?: number;
}

export type TOrderElement = {
    createdAt: string;
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    updatedAt: string;
    number: number;
}

export type TBurgerElement = {
    element: TIngridient;
}

export type TDefaultBurgerIngredient = {
    type: string;
    title: string;
    refType: LegacyRef<HTMLHeadingElement> | undefined;
}

export type TIntersectionOptions = {
    root: Element | null;
    rootMargin: string;
    threshold:  number;
}

export type TModal = {
    children: React.ReactNode;
    closeModal: () => void;
}

export type TModalOverlay = {
    closeModal: () => void
}

export type TOrderElementComponent = {
    item: TIngridient
}

export type TOrderListElement = {
    item: TOrderElement;
    isProfile: boolean
}

export type TSelectedElement = {
    element: TIngridientWithUID;
    type: string;
}

export type TUpgradedTab = {
    type: string;
    title: string;
    setTab: (type: string) => void;
}

export type TProtectedRoute = {
    children: ReactNode;
    path: string;
    forAuthUser: boolean;
    exact?: boolean;
}

export type TFormData = {
    email: string;
    password: string;
    name: string;
}

export type TUserData = {
    success: boolean;
    user: { email: string; name: string; };
    accessToken: string;
    refreshToken: string;
}

export type TUser = {
    email: string; 
    name: string;
}
