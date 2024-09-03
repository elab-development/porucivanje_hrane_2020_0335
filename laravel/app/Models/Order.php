<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id', // ID kupca
        'store_id', // ID prodavnice od koje je poručeno
        'status', // Status porudžbine (npr. 'pending', 'accepted', 'in_delivery', 'completed')
        'total_price', // Ukupna cena porudžbine
    ];

    // Relacija: Porudžbina pripada jednom kupcu
    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    // Relacija: Porudžbina pripada jednoj prodavnici
    public function store()
    {
        return $this->belongsTo(User::class, 'store_id');
    }

    // Relacija: Porudžbina može imati mnogo proizvoda
    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }

    // Relacija: Porudžbina može imati jednu dostavu
    public function delivery()
    {
        return $this->hasOne(Delivery::class);
    }
}
