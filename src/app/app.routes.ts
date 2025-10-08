import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: "", redirectTo: "home", pathMatch: "full"
    },
    {
        path: "home", loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: "products", loadComponent: () => import('./features/product/product.component').then(m => m.ProductComponent)
    },
    {
        path: "product-details/:id/:title", loadComponent: () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent)
    },
    {
        path: "cart", loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: "categories", loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
    },
    {
        path: "brands", loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent)
    },
    {
        path: "login", loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: "register", loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: "**", loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
];
