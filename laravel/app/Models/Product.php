<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'store_id', // ID prodavnice koja prodaje proizvod
    ];

    // Relacija: Proizvod pripada jednoj prodavnici
    public function store()
    {
        return $this->belongsTo(User::class, 'store_id');
    }

    // Relacija: Proizvod može biti deo mnogih porudžbina
    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }
}
