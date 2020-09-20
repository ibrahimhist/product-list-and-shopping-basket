# product-list-and-shopping-basket

Branches: master / ngrx
*master branch i ngrx siz geliştirilmiştir.
*ngrx branch i ngrx kullanılarak revize edilmiştir

Branch ayarlarından sonra:

1. Docker ile uygulamayı çalıştırabilirsiniz

   - docker-compose up
   - http://127.0.0.1:40200/products

2. Normal yüklemeler ile (default port 4200)
   - npm install
   - ng serve

Uygulamada 2 modül bulunmaktadır.

1. Ürün modülü:

   - Ürün Listeleme Sayfası
   - Shared/components Ürün Listeleme sayfası ve ileride olacak sayfalar için genel bileşenler.

2. Sepet modülü:
   - Sepet Sayfası
   - Shared/components Sepet sayfası ve ileride olacak sayfalar için genel bileşenler.

Genel kurgu:

- 2 API varsayımı:

1.  Ürün API si: Ürünler ile ilgilenen api, ürünlerin lestelenmesi, ileride yeni ürün eklenmesi, silinmesi vs.
2.  Sepet API si: Sepet ile ilgilenen api, ürünlerin sepete atılması, atılan ürünün silinmesi, miktarını değiştirme vs.

- Mock Data için Interceptor veya JSON Server kullanmadan daha basit düzeyde FakeApiService oluşturuldu. Görevi sanki back-end miş gibi, kendi db sini (FakeDatabaseService) kullanarak ve işlemlerinde gerekli validasyonlarını sağlamak, aynı zamanda http gibi Observable dönmek.
- FakeDatabaseService, sadece app componenttte database default veriler aktarılması haricinde, proje kullanımından izole edilmiştir. Fake back-end in fake database i :)
