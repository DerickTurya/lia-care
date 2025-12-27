/**
 * Sistema de feedback visual para melhorar UX
 * Adiciona animações e mensagens de confirmação ao clicar em opções
 */

// Adicionar feedback ao clicar em option-cards
document.addEventListener('DOMContentLoaded', function() {
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Adicionar efeito de "selecionado"
            this.style.transform = 'scale(0.97)';
            this.style.borderColor = 'var(--aiia-purple)';
            this.style.background = 'linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(107, 70, 193, 0.1) 100%)';
            
            // Mostrar feedback visual
            const checkmark = document.createElement('div');
            checkmark.innerHTML = '✓';
            checkmark.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 72px;
                color: var(--success-color);
                animation: fadeInScale 0.3s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(checkmark);
            
            // Aguardar um pouco antes de navegar (se houver link)
            if (this.onclick || this.href) {
                setTimeout(() => {
                    if (this.onclick) {
                        this.onclick();
                    } else if (this.href) {
                        window.location.href = this.href;
                    }
                }, 400);
                e.preventDefault();
            }
        });
    });
    
    // Adicionar animação CSS
    if (!document.querySelector('#feedbackStyles')) {
        const style = document.createElement('style');
        style.id = 'feedbackStyles';
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            .option-card {
                position: relative;
                overflow: hidden;
            }
            
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .btn::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .btn:active::after {
                width: 300px;
                height: 300px;
            }
        `;
        document.head.appendChild(style);
    }
});

// Adicionar tooltip de ajuda em elementos com data-tooltip
document.addEventListener('DOMContentLoaded', function() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        element.style.position = 'relative';
        element.style.cursor = 'help';
        
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: var(--text-dark);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 13px;
                white-space: nowrap;
                margin-bottom: 8px;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                animation: fadeIn 0.2s ease-out;
            `;
            
            const arrow = document.createElement('div');
            arrow.style.cssText = `
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid var(--text-dark);
            `;
            
            tooltip.appendChild(arrow);
            this.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Mensagens de carregamento para melhorar percepção de velocidade
function showLoadingMessage(message = 'Processando...') {
    const loader = document.createElement('div');
    loader.id = 'loadingOverlay';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(66, 153, 225, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 48px; margin-bottom: 24px;">⚡</div>
            <div style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">${message}</div>
            <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden;">
                <div style="width: 60%; height: 100%; background: white; border-radius: 2px; animation: slideProgress 1s ease-in-out infinite;"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Auto-remover após 2 segundos
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }, 2000);
}

// Adicionar animação de progresso
const progressStyle = document.createElement('style');
progressStyle.textContent = `
    @keyframes slideProgress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(250%); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(progressStyle);
