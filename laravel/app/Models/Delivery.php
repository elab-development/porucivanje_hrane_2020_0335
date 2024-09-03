<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Delivery extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', // ID porudžbine
        'delivery_person_id', // ID dostavljača
        'estimated_time', // Procenjeno vreme dostave
        'status', // Status dostave (npr. 'assigned', 'in_transit', 'delivered')
    ];

    // Relacija: Dostava pripada jednoj porudžbini
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Relacija: Dostava pripada jednom dostavljaču
    public function deliveryPerson()
    {
        return $this->belongsTo(User::class, 'delivery_person_id');
    }
}
