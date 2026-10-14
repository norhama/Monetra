<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Products/page', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        $request->user()->products()->create($validated);

        return redirect()->route('products');
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        $product = Product::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $product->update($validated);

        return redirect()->route('products');
    }

    public function destroy(Request $request, string $id)
    {
        $product = Product::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $product->delete();

        return redirect()->route('products');
    }
}
