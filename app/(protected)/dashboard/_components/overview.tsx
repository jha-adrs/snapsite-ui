"use client"
import React from 'react';

interface OverviewProps {

}

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Jan",
        total: 50
    },
    {
        name: "Feb",
        total: 20
    },
    {
        name: "Mar",
        total: 45
    },
    {
        name: "Apr",
        total: 6
    },
    {
        name: "May",
        total: 64
    },
    {
        name: "Jun",
        total: 50
    },
    {
        name: "Jul",
        total: 2
    },
    {
        name: "Aug",
        total: 0
    },
    {
        name: "Sep",
        total: 44
    },
    {
        name: "Oct",
        total: 7
    },
    {
        name: "Nov",
        total: 88
    },
    {
        name: "Dec",
        total: 4
    },
]

export function Overview({ }: OverviewProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    label={{value:"Links added", orientation:"insideLeft", position:"insideLeft", angle:-90, dy:20}}
                    
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}