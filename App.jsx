import React, { useMemo, useState } from 'react';
import { ShoppingBag, Search, Menu, Plus, Minus, X, ArrowRight, Heart } from 'lucide-react';

const products = [
  { id: 1, name: 'Sản phẩm nổi bật 01', category: 'Nổi bật', price: 199000, old: 249000, tag: 'BÁN CHẠY', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Sản phẩm nổi bật 02', category: 'Mới về', price: 289000, old: 0, tag: 'MỚI', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Sản phẩm nổi bật 03', category: 'Nổi bật', price: 159000, old: 189000, tag: 'ƯU ĐÃI', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Sản phẩm nổi bật 04', category: 'Mới về', price: 359000, old: 0, tag: '', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85' }
];

const money = n => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

export default function App() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const shown = useMemo(() => products.filter(p =>
    (category === 'Tất cả' || p.category === category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  const count = cart.reduce((n, item) => n + item.qty, 0);
  const total = cart.reduce((n, item) => n + item.price * item.qty, 0);

  function add(p) {
    setCart(old => old.some(i => i.id === p.id)
      ? old.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      : [...old, { ...p, qty: 1 }]);
    setCartOpen(true);
  }
  function change(id, delta) {
    setCart(old => old.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }

  return <div>
    <div className="topline">CHÀO MỪNG BẠN ĐẾN VỚI BIDEPZAI · MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN TỪ 500K</div>
    <header className="header">
      <button className="icon mobile" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu"><Menu /></button>
      <a className="logo" href="#">BIDE<span>PZAI.</span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <a href="#home">Trang chủ</a><a href="#products">Sản phẩm</a><a href="#about">Về chúng tôi</a><a href="#contact">Liên hệ</a>
      </nav>
      <div className="header-actions">
        <label className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm sản phẩm..." /></label>
        <button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={19}/><span>Giỏ hàng</span><b>{count}</b></button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">BIDE PZAI · ONLINE STORE</p>
          <h1>Mua sắm dễ dàng.<br/><em>Phong cách</em> của bạn.</h1>
          <p className="hero-desc">Khám phá những sản phẩm được tuyển chọn dành riêng cho bạn. Trải nghiệm mua sắm đơn giản, nhanh chóng và tiện lợi.</p>
          <a className="primary" href="#products">KHÁM PHÁ NGAY <ArrowRight size={17}/></a>
          <div className="hero-note"><span>✦</span> Bộ sưu tập mới · Ưu đãi mỗi tuần</div>
        </div>
        <div className="hero-art">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90" alt="Không gian cửa hàng hiện đại"/>
          <div className="floating-card"><b>NEW COLLECTION</b><span>Khám phá phong cách mới</span></div>
        </div>
      </section>

      <section className="benefits">
        <div><span>✧</span><section><b>Chọn lọc chất lượng</b><small>Sản phẩm được tuyển chọn</small></section></div>
        <div><span>↗</span><section><b>Giao hàng toàn quốc</b><small>Nhận hàng tận nơi</small></section></div>
        <div><span>♡</span><section><b>Hỗ trợ tận tâm</b><small>Luôn sẵn sàng hỗ trợ bạn</small></section></div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading"><div><p className="eyebrow">CỬA HÀNG CỦA CHÚNG TÔI</p><h2>Sản phẩm nổi bật</h2></div><p>Những lựa chọn dành cho bạn.</p></div>
        <div className="filters">{['Tất cả', 'Nổi bật', 'Mới về'].map(c => <button className={category === c ? 'filter active' : 'filter'} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div>
        <div className="product-grid">
          {shown.map(p => <article className="product" key={p.id}>
            <div className="product-image">{p.tag && <span className="tag">{p.tag}</span>}<button className="heart" aria-label="Yêu thích"><Heart size={18}/></button><img src={p.image} alt={p.name}/><button className="quick-add" onClick={() => add(p)}>THÊM VÀO GIỎ <Plus size={16}/></button></div>
            <div className="product-info"><span>{p.category}</span><h3>{p.name}</h3><div className="prices"><b>{money(p.price)}</b>{p.old > 0 && <del>{money(p.old)}</del>}</div></div>
          </article>)}
          {shown.length === 0 && <p>Không tìm thấy sản phẩm phù hợp.</p>}
        </div>
      </section>

      <section className="about" id="about"><p className="eyebrow">BIDE PZAI</p><h2>Một trải nghiệm mua sắm<br/>theo cách của riêng bạn.</h2><p>Chúng tôi mong muốn mang đến những sản phẩm hữu ích cùng trải nghiệm mua sắm trực tuyến thân thiện.</p></section>
    </main>

    <footer id="contact"><div className="footer-logo">BIDEPZAI.</div><p>Cửa hàng trực tuyến · Cảm ơn bạn đã ghé thăm!</p><div className="footer-links"><a href="#products">Sản phẩm</a><a href="mailto:hello@bidepzai.org">Email liên hệ</a></div><small>© {new Date().getFullYear()} Bidepzai. Thay nội dung mẫu bằng thông tin cửa hàng của bạn trước khi kinh doanh.</small></footer>

    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>Giỏ hàng ({count})</h2><button className="icon" onClick={() => setCartOpen(false)}><X/></button></div>
      {cart.length === 0 ? <p className="empty">Giỏ hàng đang trống.</p> : <>{cart.map(i => <div className="cart-item" key={i.id}><img src={i.image} alt=""/><div className="cart-detail"><b>{i.name}</b><span>{money(i.price)}</span><div className="qty"><button onClick={() => change(i.id, -1)}><Minus size={14}/></button>{i.qty}<button onClick={() => change(i.id, 1)}><Plus size={14}/></button></div></div></div>)}<div className="total"><span>Tạm tính</span><b>{money(total)}</b></div><p className="checkout-note">Đây là giỏ hàng mẫu. Để nhận đơn thật, hãy thiết lập thông tin liên hệ và quy trình thanh toán trước khi mở bán.</p></>}
      <button className="primary full" onClick={() => setCartOpen(false)}>TIẾP TỤC MUA SẮM</button>
    </aside></div>}
  </div>;
}
