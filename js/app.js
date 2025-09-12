const data = [
  {sku:'TC001',cat:'Tortas Cuadradas',title:'Torta Cuadrada de Chocolate',price:'$45.000',img:'https://images.unsplash.com/photo-1601979031959-593b3b0c8c51?q=80&w=800'},
  {sku:'TT001',cat:'Tortas Circulares',title:'Torta Circular de Vainilla',price:'$40.000',img:'https://images.unsplash.com/photo-1605478580702-ec6c7261a6e3?q=80&w=800'},
  {sku:'PI002',cat:'Postres Individuales',title:'Tiramisú Clásico',price:'$5.500',img:'https://images.unsplash.com/photo-1602777924444-31f4d7dc5f45?q=80&w=800'},
  {sku:'PSA001',cat:'Sin Azúcar',title:'Torta Sin Azúcar de Naranja',price:'$48.000',img:'https://images.unsplash.com/photo-1605478032045-93926ab9dd98?q=80&w=800'},
  {sku:'PG001',cat:'Sin Gluten',title:'Brownie Sin Gluten',price:'$4.000',img:'https://images.unsplash.com/photo-1617196035199-65f0def05d6f?q=80&w=800'},
  {sku:'PV001',cat:'Veganas',title:'Torta Vegana de Chocolate',price:'$50.000',img:'https://images.unsplash.com/photo-1599785209794-2c22fcf04dc3?q=80&w=800'},
  {sku:'TE001',cat:'Tortas Especiales',title:'Torta Especial de Cumpleaños',price:'$55.000',img:'https://images.unsplash.com/photo-1605478445869-3c61b8e1d6d4?q=80&w=800'}
];

const grid = document.getElementById('grid');

function render(items){
  grid.innerHTML = '';
  items.forEach(p=>{
    const card=document.createElement('article');
    card.className='card';
    card.innerHTML=`
      <img src="${p.img}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <div class="tag">${p.cat} • ${p.sku}</div>
      <div class="price">${p.price}</div>`;
    grid.appendChild(card);
  });
}

render(data);

function filterAndRender(q='',cat=''){
  const filtered = data.filter(p=>{
    const matchQ = q===''||p.title.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q);
    const matchCat = cat===''||p.cat===cat;
    return matchQ && matchCat;
  });
  render(filtered);
}

document.getElementById('category').addEventListener('change',e=>{
  filterAndRender(document.getElementById('q').value.toLowerCase(), e.target.value);
});
document.getElementById('q').addEventListener('input',e=>{
  filterAndRender(e.target.value.toLowerCase(), document.getElementById('category').value);
});
document.getElementById('clear').addEventListener('click',()=>{
  document.getElementById('q').value='';
  document.getElementById('category').value='';
  render(data);
});