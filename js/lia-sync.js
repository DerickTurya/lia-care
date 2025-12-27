/**
 * LIA SYNC - Sistema de sincronização em tempo real
 * Conecta colaboradores e gestores automaticamente
 */

// Teste inicial do localStorage
console.log('🔧 [LiaSync] Iniciando...');
console.log('🔧 [LiaSync] localStorage disponível:', !!window.localStorage);
try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    console.log('🔧 [LiaSync] localStorage funcional: ✅');
} catch (e) {
    console.error('🔧 [LiaSync] localStorage com erro:', e);
}

class LiaSync {
    constructor() {
        console.log('🔧 [LiaSync] Constructor chamado');
        this.storageKey = 'lia_care_licenses';
        this.notificationsKey = 'lia_care_notifications';
        console.log('🔧 [LiaSync] Keys:', this.storageKey, this.notificationsKey);
        this.init();
    }

    init() {
        console.log('🔧 [LiaSync] Init chamado');
        // Inicializa storage se não existir
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
            console.log('🔧 [LiaSync] Inicializado', this.storageKey);
        }
        if (!localStorage.getItem(this.notificationsKey)) {
            localStorage.setItem(this.notificationsKey, JSON.stringify([]));
            console.log('🔧 [LiaSync] Inicializado', this.notificationsKey);
        }
        console.log('🔧 [LiaSync] Init completo');
    }

    // Cadastra nova licença e notifica gestor
    createLicense(licenseData) {
        console.log('🔧 [LiaSync] createLicense chamado');
        console.log('🔧 [LiaSync] storageKey:', this.storageKey);
        
        const licenses = this.getLicenses();
        console.log('🔧 [LiaSync] Licenças existentes:', licenses.length);
        
        const newLicense = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            status: 'Aguardando INSS',
            managerViewed: false, // Marca como não visualizada
            ...licenseData,
            createdAt: new Date().toLocaleString('pt-BR')
        };

        console.log('🔧 [LiaSync] Nova licença criada:', newLicense);

        licenses.unshift(newLicense); // Adiciona no início
        localStorage.setItem(this.storageKey, JSON.stringify(licenses));
        
        console.log('🔧 [LiaSync] Licenças após adicionar:', licenses.length);
        console.log('🔧 [LiaSync] Salvo no localStorage');

        // Cria notificação para gestor
        this.notifyManager(newLicense);

        // Dispara evento de atualização
        window.dispatchEvent(new CustomEvent('lia:dataUpdated'));
        console.log('🔧 [LiaSync] Evento lia:dataUpdated disparado');

        return newLicense;
    }

    // Notifica gestor sobre nova licença
    notifyManager(license) {
        const notifications = this.getNotifications();
        
        const notification = {
            id: Date.now(),
            type: 'new_license',
            title: 'Nova licença cadastrada',
            message: `${license.employeeName} cadastrou uma licença de ${license.days} dias`,
            license: license,
            read: false,
            timestamp: new Date().toISOString(),
            createdAt: new Date().toLocaleString('pt-BR')
        };

        notifications.unshift(notification);
        localStorage.setItem(this.notificationsKey, JSON.stringify(notifications));

        // Dispara evento customizado
        window.dispatchEvent(new CustomEvent('lia:newNotification', { 
            detail: notification 
        }));
    }

    // Busca todas as licenças
    getLicenses() {
        const stored = localStorage.getItem(this.storageKey) || '[]';
        const licenses = JSON.parse(stored);
        console.log('🔧 [LiaSync] getLicenses retornou:', licenses.length, 'licenças');
        return licenses;
    }

    // Busca licenças não visualizadas pelo gestor
    getUnreadLicenses() {
        return this.getLicenses().filter(l => !l.managerViewed);
    }

    // Marca licença como vista pelo gestor
    markAsViewed(licenseId) {
        const licenses = this.getLicenses();
        const index = licenses.findIndex(l => l.id === licenseId);
        if (index !== -1) {
            licenses[index].managerViewed = true;
            licenses[index].viewedAt = new Date().toLocaleString('pt-BR');
            localStorage.setItem(this.storageKey, JSON.stringify(licenses));
            
            // Dispara evento para atualizar UI
            window.dispatchEvent(new CustomEvent('lia:dataUpdated'));
        }
    }

    // Busca todas as notificações
    getNotifications() {
        return JSON.parse(localStorage.getItem(this.notificationsKey) || '[]');
    }

    // Busca notificações não lidas
    getUnreadNotifications() {
        return this.getNotifications().filter(n => !n.read);
    }

    // Marca notificação como lida
    markNotificationAsRead(notificationId) {
        const notifications = this.getNotifications();
        const index = notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            notifications[index].read = true;
            notifications[index].readAt = new Date().toLocaleString('pt-BR');
            localStorage.setItem(this.notificationsKey, JSON.stringify(notifications));
        }
    }

    // Marca todas as notificações como lidas
    markAllNotificationsAsRead() {
        const notifications = this.getNotifications();
        notifications.forEach(n => {
            n.read = true;
            n.readAt = new Date().toLocaleString('pt-BR');
        });
        localStorage.setItem(this.notificationsKey, JSON.stringify(notifications));
    }

    // Atualiza status da licença
    updateLicenseStatus(licenseId, newStatus) {
        const licenses = this.getLicenses();
        const index = licenses.findIndex(l => l.id === licenseId);
        if (index !== -1) {
            licenses[index].status = newStatus;
            licenses[index].updatedAt = new Date().toLocaleString('pt-BR');
            localStorage.setItem(this.storageKey, JSON.stringify(licenses));

            // Notifica sobre mudança de status
            this.notifyStatusChange(licenses[index]);
        }
    }

    // Notifica mudança de status
    notifyStatusChange(license) {
        const notifications = this.getNotifications();
        
        const notification = {
            id: Date.now(),
            type: 'status_change',
            title: 'Status atualizado',
            message: `Licença de ${license.employeeName} - Status: ${license.status}`,
            license: license,
            read: false,
            timestamp: new Date().toISOString(),
            createdAt: new Date().toLocaleString('pt-BR')
        };

        notifications.unshift(notification);
        localStorage.setItem(this.notificationsKey, JSON.stringify(notifications));

        window.dispatchEvent(new CustomEvent('lia:statusChange', { 
            detail: notification 
        }));
    }

    // Limpa todos os dados (útil para testes)
    clearAll() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.notificationsKey);
        this.init();
    }

    // Estatísticas para o gestor
    getStats() {
        const licenses = this.getLicenses();
        return {
            total: licenses.length,
            active: licenses.filter(l => l.status.includes('Aguardando') || l.status.includes('Em andamento')).length,
            pending: licenses.filter(l => !l.managerViewed).length,
            unreadNotifications: this.getUnreadNotifications().length
        };
    }
}

// Instância global
console.log('🔧 [LiaSync] Criando instância global...');
window.liaSync = new LiaSync();
console.log('🔧 [LiaSync] Instância global criada:', !!window.liaSync);

// Listener para atualizações em tempo real (simula quando outra aba/janela atualiza)
window.addEventListener('storage', (e) => {
    if (e.key === window.liaSync.storageKey || e.key === window.liaSync.notificationsKey) {
        // Dispara evento de atualização
        window.dispatchEvent(new CustomEvent('lia:dataUpdated'));
    }
});

console.log('🔧 [LiaSync] Pronto para uso! ✅');