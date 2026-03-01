import { supabase } from './config.js';

async function checkAuth() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
        window.location.href = 'login.html';
        return null;
    }
    return session.user;
}

async function fetchUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (data) {
        document.getElementById('user-name').textContent = data.full_name || 'User';
        if (data.avatar_url) {
            document.getElementById('user-avatar').src = data.avatar_url;
        }
    }
}

async function loadDashboardData(userId) {


    const salesData = [
        { id: 1, product: 'SaaS Template', amount: 49.00, date: '2026-03-01', status: 'completed' },
        { id: 2, product: 'Custom Plugin', amount: 120.00, date: '2026-02-28', status: 'pending' },
        { id: 3, product: 'UI Kit Pro', amount: 89.00, date: '2026-02-27', status: 'completed' },
        { id: 4, product: 'API Access', amount: 29.00, date: '2026-02-25', status: 'cancelled' },
    ];


    document.getElementById('stat-total-sales').textContent = '1,284';
    document.getElementById('stat-revenue').textContent = '$14,230.50';
    document.getElementById('stat-active-products').textContent = '12';


    const tableBody = document.getElementById('transactions-body');
    tableBody.innerHTML = salesData.map(sale => `
        <tr>
            <td class="font-medium text-slate-700">${sale.product}</td>
            <td class="text-slate-600">$${sale.amount.toFixed(2)}</td>
            <td class="text-slate-400 text-sm">${new Date(sale.date).toLocaleDateString()}</td>
            <td><span class="badge badge-${sale.status}">${sale.status}</span></td>
        </tr>
    `).join('');

    initChart();
}

function initChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Sales Revenue',
                data: [3200, 4100, 3800, 5200, 4800, 6100, 5900],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { grid: { display: false } }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {

    if (window.lucide) window.lucide.createIcons();
    

    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }


    if (window.gsap) {
        window.gsap.to('.reveal', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    }

    const user = await checkAuth();
    if (user) {
        await fetchUserProfile(user.id);
        await loadDashboardData(user.id);
    }


    document.getElementById('logout-btn')?.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = 'index.html';
    });
});
