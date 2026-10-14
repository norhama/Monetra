<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $expenses = Expense::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Expenses/page', [
            'expenses' => $expenses,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0'],
            'expense_date' => ['required', 'date'],
        ]);

        $request->user()->expenses()->create($validated);

        return redirect()->route('expenses');
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0'],
            'expense_date' => ['required', 'date'],
        ]);

        $expense = Expense::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $expense->update($validated);

        return redirect()->route('expenses');
    }

    public function destroy(Request $request, string $id)
    {
        $expense = Expense::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $expense->delete();

        return redirect()->route('expenses');
    }
}
