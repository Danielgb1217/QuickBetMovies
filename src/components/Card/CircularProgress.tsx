import React from 'react';

interface CircularProgressProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    size = 40,
    strokeWidth = 2,
    color = '#4caf50'
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e6e6e6"
                strokeWidth={strokeWidth}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <text
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
                fontSize="8px"
                fill={color}
                fontWeight="bold"
            >
                {value}%
            </text>
        </svg>
    );
};

export default CircularProgress;
