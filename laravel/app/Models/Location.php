<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', // ID korisnika (prodavnica, dostavljač ili kupac)
        'latitude', // Geografska širina
        'longitude', // Geografska dužina
    ];

    // Relacija: Lokacija pripada jednom korisniku
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
