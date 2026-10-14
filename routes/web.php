<?php

use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Expense;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    $userId = $request->user()->id;

    $totalExpenses = Expense::where('user_id', $userId)
        ->sum('amount');

    $monthlyExpenses = Expense::where('user_id', $userId)
        ->whereMonth('expense_date', now()->month)
        ->whereYear('expense_date', now()->year)
        ->sum('amount');

    $expenseCount = Expense::where('user_id', $userId)
        ->count();

    $recentExpenses = Expense::where('user_id', $userId)
        ->latest('expense_date')
        ->latest('id')
        ->take(5)
        ->get();

    // Total amount spent in each category this month
    $categoryExpenses = Expense::where('user_id', $userId)
        ->whereMonth('expense_date', now()->month)
        ->whereYear('expense_date', now()->year)
        ->selectRaw('category, SUM(amount) as total')
        ->groupBy('category')
        ->orderByDesc('total')
        ->get();

    return Inertia::render('Dashboard', [
        'totalExpenses' => $totalExpenses,
        'monthlyExpenses' => $monthlyExpenses,
        'expenseCount' => $expenseCount,
        'recentExpenses' => $recentExpenses,
        'categoryExpenses' => $categoryExpenses,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/helpdesk', function () {
    return Inertia::render('Helpdesk');
});

Route::get('/practice', function () {
    return Inertia::render('HelpdeskPractice');
});

Route::get('/campus-helpdesk', function () {
    return Inertia::render('CampusHelpdeskSPA');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    Route::get('/products', [ProductController::class, 'index'])
        ->name('products');

    Route::post('/products', [ProductController::class, 'store'])
        ->name('products.store');

    Route::put('/products/{id}', [ProductController::class, 'update'])
        ->name('products.update');

    Route::delete('/products/{id}', [ProductController::class, 'destroy'])
        ->name('products.destroy');

    Route::get('/expenses', [ExpenseController::class, 'index'])
        ->name('expenses');

    Route::post('/expenses', [ExpenseController::class, 'store'])
        ->name('expenses.store');

    Route::put('/expenses/{id}', [ExpenseController::class, 'update'])
        ->name('expenses.update');

    Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy'])
        ->name('expenses.destroy');
});

require __DIR__.'/auth.php';