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
        'store_name', // Naziv prodavnice
        'address', // Adresa prodavnice
        'opening_hours', // Radno vreme
        'description', // Opis prodavnice
        'contact_number', // Kontakt broj
        'logo_url', // URL logoa prodavnice
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
