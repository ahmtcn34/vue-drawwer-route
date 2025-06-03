/**
 * Modal işlemlerini yönetmek için yardımcı fonksiyonlar
 */
import type { Router } from 'vue-router';

/**
 * Belirtilen view ve parametrelere göre modal açar
 * @param router Vue Router örneği 
 * @param view Modal'ın görüntüleneceği sayfa ('home' veya 'about')
 * @param modalType Modal'ın türü ('info', 'warning', 'confirm' vb.)
 * @param id Opsiyonel ID parametresi
 */
export function openModal(router: Router, view: string, modalType: string, id: string | number | null = null): void {
    // Artık tüm modallar için /modal/ URL'sini kullanıyoruz
    // Router beforeEach guard'ı sayesinde doğru sayfaya yönlendirilecek
    const route = id ? `/modal/${modalType}/${id}` : `/modal/${modalType}`;
    router.push(route);
}

/**
 * Modal'ı kapatır ve kullanıcıyı doğru sayfaya yönlendirir
 * @param router Vue Router örneği
 * @param view Yönlendirilecek sayfa
 */
export function closeModal(router: Router, view: string): void {
    // View parametresine göre uygun sayfaya yönlendir
    if (view === 'about') {
        router.push('/about');
    } else {
        router.push('/');
    }
} 