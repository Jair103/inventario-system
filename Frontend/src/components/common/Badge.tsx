// src/components/common/Badge.tsx
interface BadgeProps {
    children: React.ReactNode;
    type: 'success' | 'warning' | 'danger' | 'neutral';
}

export function Badge({ children, type }: BadgeProps) {
    const colors = {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        neutral: 'bg-gray-100 text-gray-800',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[type]}`}>
      {children}
    </span>
    );
}