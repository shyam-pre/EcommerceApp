  import React, { useState, useMemo, useCallback } from 'react';
  import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
  import ProductItem from './ProductItem';

  // ------------ MAIN SCREEN (LOGIC + OPTIMIZATION) -------------
  export default function ProductScreen() {
    const [search, setSearch] = useState('');
  type Product = {
    id: number;
    name: string;
    price: number;
  };

    const products: Product[] = [
      { id: 1, name: 'Shoes', price: 1200 },
      { id: 2, name: 'Watch', price: 800 },
      { id: 3, name: 'T-shirt', price: 500 },
      { id: 4, name: 'Laptop', price: 55000 },
    ];

    // ---------------- USEMEMO ----------------
    // Only recompute when "search" changes 
    // const filteredProducts = useMemo(() => {
    //   console.log('Filtering products...'); 

    //   return products.filter((item) => 
    //   item.name.toLowerCase().includes(search.toLowerCase())
    //   );
    // }, [search]);
    const filteredProducts = useMemo(() => { 
      console.log('Filtering products...');
      return products.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    },[search])

    // ---------------- USECALLBACK ----------------
    // Function reference same rahega → child re-render nahi hoga
    const handleAddToCart = useCallback((item: Product) => {
      console.log('Added to cart:', item.name); 
    }, []);
    // const handleAddToCart = (item:Product) => {
    //   console.log('Added to cart:', item.name)
    // }
    console.log('reeeeeeeeeeeeee'); 
    
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search product..."
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            marginBottom: 15
          }}
        />

        <FlatList
          data={filteredProducts} 
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => ( 
            <ProductItem item={item} onAddToCart={handleAddToCart} />
          )}
        />
      </View>
    );
  }