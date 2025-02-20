// client.js  
class AccessControl {  
    constructor() {  
        this.searchEngines = {  
            google: ['google.com', 'google.ru'],  
            yandex: ['yandex.ru', 'yandex.com'],  
            bing: ['bing.com']  
        };  
        
        this.checkAccess();  
    }  

    isValidReferer() {  
        const referer = document.referrer;  
        if (!referer) return false;  

        return Object.values(this.searchEngines).flat().some(domain =>   
            referer.includes(domain)  
        );  
    }  

    getStoredAccess() {  
        return localStorage.getItem('validAccess');  
    }  

    setStoredAccess() {  
        localStorage.setItem('validAccess', 'true');  
        localStorage.setItem('accessTimestamp', Date.now().toString());  
    }  

    isStoredAccessValid() {  
        const timestamp = parseInt(localStorage.getItem('accessTimestamp'));  
        const now = Date.now();  
        // Проверяем, не истекла ли сессия (24 часа)  
        return now - timestamp < 24 * 60 * 60 * 1000;  
    }  

    checkAccess() {  
        // Проверяем сохраненный доступ  
        if (this.getStoredAccess() && this.isStoredAccessValid()) {  
            return true;  
        }  

        // Проверяем реферер  
        if (this.isValidReferer()) {  
            this.setStoredAccess();  
            return true;  
        }  

        // Если доступ запрещен  
        this.handleInvalidAccess();  
        return false;  
    }  

    handleInvalidAccess() {  
        // Очищаем localStorage  
        localStorage.clear();  
        
        // Создаем элемент с сообщением об ошибке  
        const errorDiv = document.createElement('div');  
        errorDiv.style.cssText = `  
            position: fixed;  
            top: 0;  
            left: 0;  
            width: 100%;  
            height: 100%;  
            background: white;  
            display: flex;  
            align-items: center;  
            justify-content: center;  
            flex-direction: column;  
            z-index: 9999;  
        `;  
        
        errorDiv.innerHTML = `  
            <h1>Access Denied</h1>  
            <p>Please use search engine to access this content</p>  
        `;  
        
        // Удаляем весь контент и показываем сообщение об ошибке  
        document.body.innerHTML = '';  
        document.body.appendChild(errorDiv);  
    }  
}  

// Использование:  
document.addEventListener('DOMContentLoaded', () => {  
    const access = new AccessControl();  
});