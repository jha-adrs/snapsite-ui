import React from 'react';
import HeatMap from '@uiw/react-heat-map';
import { Card } from '@/components/ui/card';

const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/04/12', count: 2 },
    { date: '2016/05/01', count: 5 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/05/03', count: 1 },
    { date: '2016/05/04', count: 11 },
    { date: '2016/05/08', count: 32 },
];

export const LinkHeatmap = () => {
    return (
        <div className="w-full items-center justify-center flex p-4">
            <Card className='border rounded-lg p-2 flex w-full items-center justify-center'>
                <HeatMap
                    value={value}
                    width={600}
                    style={{ color: 'var(--foreground)'}}
                    startDate={new Date('2016/01/01')}
                    rectProps={{
                        rx: 2,
                        ry: 2,
                    }}
                    panelColors={{
                        0: '#FFFDF7',
                        2: '#FFA732',
                        4: '#711DB0',
                        10: '#D04848',
                        20: '#FF78C4',
                        30: '#EF4040',
                    }}
                />
            </Card>
        </div>
    )
};