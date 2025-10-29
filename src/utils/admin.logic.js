import { render, fireEvent, screen } from '@testing-library/react'; // Si usas react-testing-library
import Admin from './Admin';  // Asegúrate de ajustar la ruta al componente
import React from 'react';

describe('Admin Component', () => {
  
  // Test de agregar un producto
  it('should add a product', () => {
    const { getByPlaceholderText, getByText } = render(<Admin />);
    
    const nombreInput = getByPlaceholderText('Nombre');
    const precioInput = getByPlaceholderText('Precio');
    const imagenInput = getByPlaceholderText('Ruta de imagen (img/...)');
    const agregarButton = getByText('Agregar producto');
    
    // Simulamos el ingreso de datos en el formulario
    fireEvent.change(nombreInput, { target: { value: 'Producto de prueba' } });
    fireEvent.change(precioInput, { target: { value: '1000' } });
    fireEvent.change(imagenInput, { target: { value: '/img/test.jpg' } });
    
    fireEvent.click(agregarButton);
    
    // Verificar que el producto fue agregado
    expect(screen.getByText('Producto de prueba')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });

  // Test de eliminar un producto
  it('should delete a product', () => {
    const { getByText, queryByText } = render(<Admin />);
    
    // Simulamos la creación de un producto
    const nombreInput = screen.getByPlaceholderText('Nombre');
    const precioInput = screen.getByPlaceholderText('Precio');
    const imagenInput = screen.getByPlaceholderText('Ruta de imagen (img/...)');
    const agregarButton = screen.getByText('Agregar producto');
    
    fireEvent.change(nombreInput, { target: { value: 'Producto para eliminar' } });
    fireEvent.change(precioInput, { target: { value: '500' } });
    fireEvent.change(imagenInput, { target: { value: '/img/test.jpg' } });
    fireEvent.click(agregarButton);
    
    // Verificar que el producto fue agregado
    expect(screen.getByText('Producto para eliminar')).toBeInTheDocument();
    
    // Simulamos el click para eliminar el producto
    const eliminarButton = screen.getByText('Eliminar');
    fireEvent.click(eliminarButton);
    
    // Verificar que el producto fue eliminado
    expect(queryByText('Producto para eliminar')).not.toBeInTheDocument();
  });

  // Test de agregar una publicación
  it('should add a blog post', () => {
    const { getByPlaceholderText, getByText } = render(<Admin />);
    
    const tituloInput = getByPlaceholderText('Título');
    const contenidoInput = getByPlaceholderText('Contenido...');
    const imagenInput = getByPlaceholderText('Ruta o URL de imagen (img/...)');
    const publicarButton = getByText('Publicar');
    
    fireEvent.change(tituloInput, { target: { value: 'Mi primer post' } });
    fireEvent.change(contenidoInput, { target: { value: 'Este es el contenido del post.' } });
    fireEvent.change(imagenInput, { target: { value: '/img/post.jpg' } });
    
    fireEvent.click(publicarButton);
    
    // Verificar que la publicación fue agregada
    expect(screen.getByText('Mi primer post')).toBeInTheDocument();
    expect(screen.getByText('Este es el contenido del post.')).toBeInTheDocument();
  });

  // Test de eliminar una publicación
  it('should delete a blog post', () => {
    const { getByText, queryByText } = render(<Admin />);
    
    // Simulamos la creación de una publicación
    const tituloInput = screen.getByPlaceholderText('Título');
    const contenidoInput = screen.getByPlaceholderText('Contenido...');
    const publicarButton = screen.getByText('Publicar');
    
    fireEvent.change(tituloInput, { target: { value: 'Post para eliminar' } });
    fireEvent.change(contenidoInput, { target: { value: 'Este es el contenido del post a eliminar.' } });
    fireEvent.click(publicarButton);
    
    // Verificar que la publicación fue agregada
    expect(screen.getByText('Post para eliminar')).toBeInTheDocument();
    
    // Simulamos el click para eliminar la publicación
    const eliminarButton = screen.getByText('Eliminar');
    fireEvent.click(eliminarButton);
    
    // Verificar que la publicación fue eliminada
    expect(queryByText('Post para eliminar')).not.toBeInTheDocument();
  });

});
