import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Product = {
  id: number;
  name: string;
  price: number;
};

// ------------ CHILD COMPONENT (HIGHLY OPTIMIZED) -------------
const ProductItem = React.memo(
  ({ item, onAddToCart }: { item: Product; onAddToCart: (p: Product) => void }) => {
    console.log('Rendering:', item.name);

    return (
      <View style={{
        padding: 12,
        borderWidth: 1,
        marginVertical: 6,
        borderRadius: 8
      }}>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        <Text style={{ fontSize: 16 }}>₹ {item.price}</Text>

        <TouchableOpacity
          onPress={() => onAddToCart(item)}
          style={{
            marginTop: 8,
            padding: 8,
            backgroundColor: 'green'
          }}
        >
          <Text style={{ color: '#fff' }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  }
);
export default ProductItem