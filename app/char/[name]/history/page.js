"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getYesterdayDate } from "@/lib/getYesterdayDate";
import { getCharacterCombatPowerHistory } from "@/lib/todAPI/getCharacterCombatPowerHistory";
import { getCharacterExpHistory } from "@/lib/todAPI/getCharacterExpHistory";
import { getCharacterLevelHistory } from "@/lib/todAPI/getCharacterLevelHistory";
import { getCharacterUnionHistory } from "@/lib/todAPI/getCharacterUnionHistory";
import { updateCharacterHistory } from "@/lib/todAPI/updateCharacterHistory";
import { cn } from "@/lib/utils";
import { createChart } from "lightweight-charts";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useRef, useState } from "react";

const themesData = {
    dark: {
        chart: {
            layout: {
                background: {
                    type: 'solid',
                    color: '#09090b',
                },
                lineColor: '#09090b',
                textColor: '#D9D9D9',
            },
            watermark: {
                color: 'rgba(0, 0, 0, 0)',
            },
            crosshair: {
                color: '#758696',
            },
            grid: {
                vertLines: {
                    color: '#09090b',
                },
                horzLines: {
                    color: '#363C4E',
                },
            },
        },
        series: {
            topColor: 'rgba(32, 226, 47, 0.56)',
            bottomColor: 'rgba(32, 226, 47, 0.04)',
            lineColor: 'rgba(32, 226, 47, 1)',
            color: 'rgba(37, 120, 35, 1)',
        },
    },
    light: {
        chart: {
            layout: {
                background: {
                    type: 'solid',
                    color: '#FFFFFF',
                },
                lineColor: '#2B2B43',
                textColor: '#191919',
            },
            watermark: {
                color: 'rgba(0, 0, 0, 0)',
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    color: '#dedede',
                },
            },
        },
        series: {
            topColor: 'rgba(33, 186, 47, 0.56)',
            bottomColor: 'rgba(33, 186, 47, 0.04)',
            lineColor: 'rgba(33, 186, 47, 1)',
            color: 'rgba(33, 186, 47, 1)',
        },
    }
}

export default function CharHistory({ params, searchParams }) {
    const characterName = decodeURI(params.name);
    const currentTheme = useTheme();
    const [mobileChartTouch, setMobileChartTouch] = useState(true);
    useEffect(() => {
        if (window.screen.width <= 430) setMobileChartTouch(false);
    }, [])

    const yesterDate = new Date(getYesterdayDate());
    const weekAgoDate = new Date(getYesterdayDate());
    weekAgoDate.setDate(yesterDate.getDate() - 7);
    useEffect(() => {
        if (expData.length >= 1) return;

        const period = {
            timeFrom: ``,
            timeTo: `${yesterDate.getFullYear()}-${yesterDate.getMonth() + 1}-${yesterDate.getDate()}`,
        };

        getExpHistoryFromDB(period);
        getLevelHistoryFromDB(period);
        getCombatPowerHistoryFromDB(period);
        getUnionHistoryFromDB(period);
    }, []);

    useEffect(() => {
        if (expChart && expAreaSeries) {
            expChart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            expAreaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);
        }
        if (levelChart && levelAreaSeries) {
            levelChart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            levelAreaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);
        }
        if (combatPowerChart && combatPowerAreaSeries) {
            combatPowerChart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            combatPowerAreaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);
        }
        if (unionChart && unionAreaSeries) {
            unionChart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            unionAreaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);
        }
    }, [currentTheme]);

    function getBusinessDayBeforeCurrentAt(date, daysDelta) {
        const dateWithDelta = new Date(date);
        dateWithDelta.setDate(dateWithDelta.getDate() - daysDelta);
        return `${dateWithDelta.getFullYear()}-${dateWithDelta.getMonth() + 1}-${dateWithDelta.getDate()}`;
    };

    const expChartRef = useRef(null);
    const [expChart, setExpChart] = useState(null);
    const [expAreaSeries, setExpAreaSeries] = useState(null);
    const [expData, setExpData] = useState([]);
    const expDataRef = useRef(expData);
    const expChartTooltip = useRef(null);
    useEffect(() => {
        expDataRef.current = expData;
    }, [expData]);
    const createExpChart = () => {
        try {
            const container = expChartRef.current;
            if (expChart) container.firstChild.remove();

            const chart = createChart(container, {
                autoSize: true,
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    }
                },
                handleScale: {
                    axisPressedMouseMove: false,
                },
                timeScale: {
                    borderVisible: false,
                    tickMarkFormatter: (time, tickMarkType, locale) => {
                        const refineDate = new Date(time);
                        return refineDate.getFullYear() + '-' + (refineDate.getMonth() + 1) + '-' + refineDate.getDate()
                    },
                },
                localization: {
                    timeFormatter: (date) => date,
                },
            });

            const areaSeries = chart.addHistogramSeries({
                autoscaleInfoProvider: () => {
                    return {
                        priceRange: {
                            minValue: 0,
                            maxValue: 100,
                        },
                    };
                },
                priceFormat: {
                    type: "custom",
                    formatter: (val) => parseInt(val) == 100 ?
                        "100%" :
                        parseInt(val) == 0 ?
                            "0%" :
                            val.toFixed(3) + "%"
                    ,
                },
                color: 'blue',
            });

            try {
                areaSeries.setData(expData);
            } catch (err) {
                console.warn(err);
                setExpData([...new Map(expData.map((obj) => [obj["time"], obj])).values()]);
                areaSeries.setData([...new Map(expData.map((obj) => [obj["time"], obj])).values()]);
            }
            chart.timeScale().fitContent();
            const toolTipMargin = 15;
            const toolTip = expChartTooltip.current;
            container.appendChild(toolTip);
            chart.subscribeCrosshairMove(param => {
                if (
                    param.point === undefined ||
                    !param.time ||
                    param.point.x < 0 ||
                    param.point.x > container.clientWidth ||
                    param.point.y < 0 ||
                    param.point.y > container.clientHeight
                ) {
                    toolTip.style.display = 'none';
                } else {
                    const dateStr = param.time;
                    toolTip.style.display = 'block';
                    const data = param.seriesData.get(areaSeries);
                    const price = data.value !== undefined ? data.value : data.close;
                    toolTip.innerHTML = `
                        <div class="text-2xl">
                            ${Math.round(100 * price) / 100}%
                        </div>
                        <div class="text-xs">
                            ${dateStr}
                        </div>`;

                    const y = param.point.y;
                    let left = param.point.x + toolTipMargin;
                    if (left > container.clientWidth) {
                        left = param.point.x - toolTipMargin;
                    }

                    let top = y + toolTipMargin;
                    if (top > container.clientHeight) {
                        top = y - toolTipMargin;
                    }
                    toolTip.style.left = left + 'px';
                    toolTip.style.top = top + 'px';
                }
            });

            const timeScale = chart.timeScale();

            let timer = null;
            timeScale.subscribeVisibleLogicalRangeChange(() => {
                if (timer !== null) {
                    return;
                }
                timer = setTimeout(() => {
                    const logicalRange = timeScale.getVisibleLogicalRange();
                    if (logicalRange !== null) {
                        const barsInfo = areaSeries.barsInLogicalRange(logicalRange);
                        if (barsInfo !== null && barsInfo.barsBefore < 7) {
                            const firstTime = getBusinessDayBeforeCurrentAt(expDataRef.current[0].time, 1);
                            if (firstTime == "2023-12-20") return;
                            const lastTime = getBusinessDayBeforeCurrentAt(firstTime, Math.max(7, -barsInfo.barsBefore + 7));
                            const newPeriod = {
                                timeFrom: lastTime,
                                timeTo: firstTime,
                            };
                            getExpHistoryFromDB(newPeriod);
                        }
                    }
                    timer = null;
                }, 50);
            });


            chart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            areaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);

            setExpChart(chart);
            setExpAreaSeries(areaSeries);
        } catch (err) {
            console.error(err);
        }
    };
    async function getExpHistoryFromDB(period) {
        const newData = await getCharacterExpHistory(
            characterName,
            period.timeFrom,
            period.timeTo,
        )

        setExpData([...newData, ...expDataRef.current]);
    }
    useEffect(() => {
        if (expData.length == 0) return;

        if (!expChart) createExpChart();
        else expAreaSeries.setData(expData);
    }, [expData]);

    const levelChartRef = useRef(null);
    const [levelChart, setLevelChart] = useState(null);
    const [levelAreaSeries, setLevelAreaSeries] = useState(null);
    const [levelData, setLevelData] = useState([]);
    const levelDataRef = useRef(levelData);
    const levelChartTooltip = useRef(null);
    useEffect(() => {
        levelDataRef.current = levelData;
    }, [levelData]);
    const createLevelChart = () => {
        try {
            const container = levelChartRef.current;
            if (levelChart) container.firstChild.remove();

            const chart = createChart(container, {
                autoSize: true,
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    }
                },
                handleScale: {
                    axisPressedMouseMove: false,
                },
                timeScale: {
                    borderVisible: false,
                    tickMarkFormatter: (time, tickMarkType, locale) => {
                        const refineDate = new Date(time);
                        return refineDate.getFullYear() + '-' + (refineDate.getMonth() + 1) + '-' + refineDate.getDate()
                    },
                },
                localization: {
                    timeFormatter: (date) => date,
                },
            });

            const areaSeries = chart.addAreaSeries({
                // autoscaleInfoProvider: () => {
                //     return {
                //         priceRange: {
                //             minValue: 0,
                //             maxValue: 300,
                //         },
                //     };
                // },
                priceFormat: {
                    type: "custom",
                    formatter: (val) => val.toFixed(0),
                },
            });

            try {
                areaSeries.setData(levelData);
            } catch (err) {
                console.warn(err);
                setLevelData([...new Map(levelData.map((obj) => [obj["time"], obj])).values()]);
                areaSeries.setData([...new Map(levelData.map((obj) => [obj["time"], obj])).values()]);
            }
            chart.timeScale().fitContent();
            const toolTipMargin = 15;
            const toolTip = levelChartTooltip.current;
            container.appendChild(toolTip);
            chart.subscribeCrosshairMove(param => {
                if (
                    param.point === undefined ||
                    !param.time ||
                    param.point.x < 0 ||
                    param.point.x > container.clientWidth ||
                    param.point.y < 0 ||
                    param.point.y > container.clientHeight
                ) {
                    toolTip.style.display = 'none';
                } else {
                    const dateStr = param.time;
                    toolTip.style.display = 'block';
                    const data = param.seriesData.get(areaSeries);
                    const price = data.value !== undefined ? data.value : data.close;
                    toolTip.innerHTML = `
                    <div class="text-2xl">
                        ${price.toLocaleString()}
                    </div>
                    <div class="text-xs">
                        ${dateStr}
                    </div>`;

                    const y = param.point.y;
                    let left = param.point.x + toolTipMargin;
                    if (left > container.clientWidth) {
                        left = param.point.x - toolTipMargin;
                    }

                    let top = y + toolTipMargin;
                    if (top > container.clientHeight) {
                        top = y - toolTipMargin;
                    }
                    toolTip.style.left = left + 'px';
                    toolTip.style.top = top + 'px';
                }
            });

            const timeScale = chart.timeScale();

            let timer = null;
            timeScale.subscribeVisibleLogicalRangeChange(() => {
                if (timer !== null) {
                    return;
                }
                timer = setTimeout(() => {
                    const logicalRange = timeScale.getVisibleLogicalRange();
                    if (logicalRange !== null) {
                        const barsInfo = areaSeries.barsInLogicalRange(logicalRange);
                        if (barsInfo !== null && barsInfo.barsBefore < 7) {
                            const firstTime = getBusinessDayBeforeCurrentAt(levelDataRef.current[0].time, 1);
                            if (firstTime == "2023-12-20") return;
                            const lastTime = getBusinessDayBeforeCurrentAt(firstTime, Math.max(7, -barsInfo.barsBefore + 7));
                            const newPeriod = {
                                timeFrom: lastTime,
                                timeTo: firstTime,
                            };
                            getLevelHistoryFromDB(newPeriod);
                        }
                    }
                    timer = null;
                }, 50);
            });

            chart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            areaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);

            setLevelChart(chart);
            setLevelAreaSeries(areaSeries);
        } catch (err) {
            console.error(err);
        }
    };
    async function getLevelHistoryFromDB(period) {
        const newData = await getCharacterLevelHistory(
            characterName,
            period.timeFrom,
            period.timeTo,
        )

        setLevelData([...newData, ...levelDataRef.current]);
    }
    useEffect(() => {
        if (levelData.length == 0) return;

        if (!levelChart) createLevelChart();
        else levelAreaSeries.setData(levelData);
    }, [levelData]);

    const combatPowerChartRef = useRef(null);
    const [combatPowerChart, setCombatPowerChart] = useState(null);
    const [combatPowerAreaSeries, setCombatPowerAreaSeries] = useState(null);
    const [combatPowerData, setCombatPowerData] = useState([]);
    const combatPowerDataRef = useRef(combatPowerData);
    const combatPowerChartTooltip = useRef(null);
    useEffect(() => {
        combatPowerDataRef.current = combatPowerData;
    }, [combatPowerData]);
    const createCombatPowerChart = () => {
        try {
            const container = combatPowerChartRef.current;
            if (combatPowerChart) container.firstChild.remove();

            const chart = createChart(container, {
                autoSize: true,
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    }
                },
                handleScale: {
                    axisPressedMouseMove: false,
                },
                timeScale: {
                    borderVisible: false,
                    tickMarkFormatter: (time, tickMarkType, locale) => {
                        const refineDate = new Date(time);
                        return refineDate.getFullYear() + '-' + (refineDate.getMonth() + 1) + '-' + refineDate.getDate()
                    },
                },
                localization: {
                    timeFormatter: (date) => date,
                },
            });

            const areaSeries = chart.addAreaSeries({
                // autoscaleInfoProvider: () => {
                //     return {
                //         priceRange: {
                //             minValue: 0,
                //             maxValue: 100,
                //         },
                //     };
                // },
                priceFormat: {
                    type: "custom",
                    formatter: (val) => parseInt(val.toFixed(0)).toLocaleString(),
                },
            });

            try {
                areaSeries.setData(combatPowerData);
            } catch (err) {
                console.warn(err);
                setCombatPowerData([...new Map(combatPowerData.map((obj) => [obj["time"], obj])).values()]);
                areaSeries.setData([...new Map(combatPowerData.map((obj) => [obj["time"], obj])).values()]);
            }
            chart.timeScale().fitContent();
            const toolTipMargin = 15;
            const toolTip = combatPowerChartTooltip.current;
            container.appendChild(toolTip);
            chart.subscribeCrosshairMove(param => {
                if (
                    param.point === undefined ||
                    !param.time ||
                    param.point.x < 0 ||
                    param.point.x > container.clientWidth ||
                    param.point.y < 0 ||
                    param.point.y > container.clientHeight
                ) {
                    toolTip.style.display = 'none';
                } else {
                    const dateStr = param.time;
                    toolTip.style.display = 'block';
                    const data = param.seriesData.get(areaSeries);
                    const price = data.value !== undefined ? data.value : data.close;
                    toolTip.innerHTML = `
                    <div class="text-2xl">
                        ${price.toLocaleString()}
                    </div>
                    <div class="text-xs">
                        ${dateStr}
                    </div>`;

                    const y = param.point.y;
                    let left = param.point.x + toolTipMargin;
                    if (left > container.clientWidth) {
                        left = param.point.x - toolTipMargin;
                    }

                    let top = y + toolTipMargin;
                    if (top > container.clientHeight) {
                        top = y - toolTipMargin;
                    }
                    toolTip.style.left = left + 'px';
                    toolTip.style.top = top + 'px';
                }
            });

            const timeScale = chart.timeScale();

            let timer = null;
            timeScale.subscribeVisibleLogicalRangeChange(() => {
                if (timer !== null) {
                    return;
                }
                timer = setTimeout(() => {
                    const logicalRange = timeScale.getVisibleLogicalRange();
                    if (logicalRange !== null) {
                        const barsInfo = areaSeries.barsInLogicalRange(logicalRange);
                        if (barsInfo !== null && barsInfo.barsBefore < 7) {
                            const firstTime = getBusinessDayBeforeCurrentAt(combatPowerDataRef.current[0].time, 1);
                            if (firstTime == "2023-12-20") return;
                            const lastTime = getBusinessDayBeforeCurrentAt(firstTime, Math.max(7, -barsInfo.barsBefore + 7));
                            const newPeriod = {
                                timeFrom: lastTime,
                                timeTo: firstTime,
                            };
                            getCombatPowerHistoryFromDB(newPeriod);
                        }
                    }
                    timer = null;
                }, 50);
            });

            chart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            areaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);

            setCombatPowerChart(chart);
            setCombatPowerAreaSeries(areaSeries);
        } catch (err) {
            console.error(err);
        }
    };
    async function getCombatPowerHistoryFromDB(period) {
        const newData = await getCharacterCombatPowerHistory(
            characterName,
            period.timeFrom,
            period.timeTo,
        )

        setCombatPowerData([...newData, ...combatPowerDataRef.current]);
    }
    useEffect(() => {
        if (combatPowerData.length == 0) return;

        if (!combatPowerChart) createCombatPowerChart();
        else combatPowerAreaSeries.setData(combatPowerData);
    }, [combatPowerData]);

    const unionChartRef = useRef(null);
    const [unionChart, setUnionChart] = useState(null);
    const [unionAreaSeries, setUnionAreaSeries] = useState(null);
    const [unionData, setUnionData] = useState([]);
    const unionDataRef = useRef(unionData);
    const unionChartTooltip = useRef(null);
    useEffect(() => {
        unionDataRef.current = unionData;
    }, [unionData]);
    const createUnionChart = () => {
        try {
            const container = unionChartRef.current;
            if (unionChart) container.firstChild.remove();

            const chart = createChart(container, {
                autoSize: true,
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    }
                },
                handleScale: {
                    axisPressedMouseMove: false,
                },
                timeScale: {
                    borderVisible: false,
                    tickMarkFormatter: (time, tickMarkType, locale) => {
                        const refineDate = new Date(time);
                        return refineDate.getFullYear() + '-' + (refineDate.getMonth() + 1) + '-' + refineDate.getDate()
                    },
                },
                localization: {
                    timeFormatter: (date) => date,
                },
            });

            const areaSeries = chart.addAreaSeries({
                priceFormat: {
                    type: "custom",
                    formatter: (val) => parseInt(val).toLocaleString(),
                },
            });

            try {
                areaSeries.setData(unionData);
            } catch (err) {
                console.warn(err);
                setUnionData([...new Map(unionData.map((obj) => [obj["time"], obj])).values()]);
                areaSeries.setData([...new Map(unionData.map((obj) => [obj["time"], obj])).values()]);
            }
            chart.timeScale().fitContent();
            const toolTipMargin = 15;
            const toolTip = unionChartTooltip.current;
            container.appendChild(toolTip);
            chart.subscribeCrosshairMove(param => {
                if (
                    param.point === undefined ||
                    !param.time ||
                    param.point.x < 0 ||
                    param.point.x > container.clientWidth ||
                    param.point.y < 0 ||
                    param.point.y > container.clientHeight
                ) {
                    toolTip.style.display = 'none';
                } else {
                    const dateStr = param.time;
                    toolTip.style.display = 'block';
                    const data = param.seriesData.get(areaSeries);
                    const price = data.value !== undefined ? data.value : data.close;
                    toolTip.innerHTML = `
                    <div class="text-2xl">
                        ${price.toLocaleString()}
                    </div>
                    <div class="text-xs">
                        ${dateStr}
                    </div>`;

                    const y = param.point.y;
                    let left = param.point.x + toolTipMargin;
                    if (left > container.clientWidth) {
                        left = param.point.x - toolTipMargin;
                    }

                    let top = y + toolTipMargin;
                    if (top > container.clientHeight) {
                        top = y - toolTipMargin;
                    }
                    toolTip.style.left = left + 'px';
                    toolTip.style.top = top + 'px';
                }
            });

            const timeScale = chart.timeScale();

            let timer = null;
            timeScale.subscribeVisibleLogicalRangeChange(() => {
                if (timer !== null) {
                    return;
                }
                timer = setTimeout(() => {
                    const logicalRange = timeScale.getVisibleLogicalRange();
                    if (logicalRange !== null) {
                        const barsInfo = areaSeries.barsInLogicalRange(logicalRange);
                        if (barsInfo !== null && barsInfo.barsBefore < 7) {
                            const firstTime = getBusinessDayBeforeCurrentAt(unionDataRef.current[0].time, 1);
                            if (firstTime == "2023-12-20") return;
                            const lastTime = getBusinessDayBeforeCurrentAt(firstTime, Math.max(7, -barsInfo.barsBefore + 7));
                            const newPeriod = {
                                timeFrom: lastTime,
                                timeTo: firstTime,
                            };
                            getUnionHistoryFromDB(newPeriod);
                        }
                    }
                    timer = null;
                }, 50);
            });

            chart.applyOptions(themesData[currentTheme.resolvedTheme].chart);
            areaSeries.applyOptions(themesData[currentTheme.resolvedTheme].series);

            setUnionChart(chart);
            setUnionAreaSeries(areaSeries);
        } catch (err) {
            console.error(err);
        }
    };
    async function getUnionHistoryFromDB(period) {
        const newData = await getCharacterUnionHistory(
            characterName,
            period.timeFrom,
            period.timeTo,
        )

        setUnionData([...newData, ...unionDataRef.current]);
    }

    const [isUpdateStart, setIsUpdateStart] = useState(false)
    const handleUpdateCharacterHistory = async () => {
        try {
            setIsUpdateStart(true);

            toast({
                title: "🔍 서버에서 갱신 작업을 시작하겠습니다.",
                description: "이 페이지를 벗어나 다른 작업을 하고 오셔도 됩니다!"
            })

            await updateCharacterHistory(characterName);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (unionData.length == 0) return;

        if (!unionChart) createUnionChart();
        else unionAreaSeries.setData(unionData);
    }, [unionData]);

    return (
        <>
            <div className="flex gap-2 justify-end">
                <Button
                    variant="secondary"
                    onClick={() => setMobileChartTouch(!mobileChartTouch)}
                    className={window.screen.width <= 430 ? "block" : "hidden"}>
                    {mobileChartTouch ? "차트 터치 끄기" : "차트 터치 켜기"}
                </Button>
                <Button onClick={handleUpdateCharacterHistory} disabled={isUpdateStart || expData?.[expData.length - 1]?.time == getYesterdayDate()} >전체갱신</Button>
            </div>
            <div className="mt-5 flex flex-col items-center">

                <div className={cn("w-full sm:w-4/5 space-y-10", mobileChartTouch ? "pointer-events-auto" : "pointer-events-none")}>
                    <div>
                        <div className="text-start text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                            전투력
                        </div>
                        <div className="h-60">
                            <div className="w-full h-full relative" ref={combatPowerChartRef} />
                            <div
                                ref={combatPowerChartTooltip}
                                className="hidden absolute z-50 rounded-md border-[1px] border-white shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                style={{ "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)", "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)", "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)", "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)" }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-start text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] mb-3">
                            경험치
                        </div>
                        <div className="h-60">
                            <div className="w-full h-full relative" ref={expChartRef} />
                            <div
                                ref={expChartTooltip}
                                className="hidden absolute z-50 rounded-md border-[1px] border-white shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                style={{ "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)", "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)", "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)", "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)" }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-start text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                            레벨
                        </div>
                        <div className="h-60">
                            <div className="w-full h-full relative" ref={levelChartRef} />
                            <div
                                ref={levelChartTooltip}
                                className="hidden absolute z-50 rounded-md border-[1px] border-white shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                style={{ "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)", "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)", "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)", "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)" }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-start text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                            유니온
                        </div>
                        <div className="h-60">
                            <div className="w-full h-full relative" ref={unionChartRef} />
                            <div
                                ref={unionChartTooltip}
                                className="hidden absolute z-50 rounded-md border-[1px] border-white shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-white w-auto p-3 bg-neutral-800 dark:bg-popover"
                                style={{ "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)", "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)", "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)", "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)" }}
                            />
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
}
