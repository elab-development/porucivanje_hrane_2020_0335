<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // 'admin', 'store', 'delivery_person', 'customer', 'guest'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relacija: Jedan korisnik (prodavnica) može imati više proizvoda
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // Relacija: Jedan korisnik (kupac) može imati više porudžbina
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // Relacija: Jedan korisnik (dostavljač) može imati više dostava
    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }

    // Provera da li je korisnik admin
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    // Provera da li je korisnik prodavnica
    public function isStore()
    {
        return $this->role === 'store';
    }

    // Provera da li je korisnik dostavljač
    public function isDeliveryPerson()
    {
        return $this->role === 'delivery_person';
    }

    // Provera da li je korisnik kupac
    public function isCustomer()
    {
        return $this->role === 'customer';
    }

    // Provera da li je korisnik gost
    public function isGuest()
    {
        return $this->role === 'guest';
    }
}
