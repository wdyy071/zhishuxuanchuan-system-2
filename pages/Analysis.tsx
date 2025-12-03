      {/* Top Section: Chart & Comparison */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Chart (Reduced to 5/12) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          
          <div>
            {/* Chart Section */}
            <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden">
              {/* 1. Header Metrics (Only for Real-time mode) */}
              {timeRange === '实时' && (
                <div className="px-6 pt-6 pb-2">
                  <h2 className="text-sm font-bold text-slate-700 mb-4">业绩走势</h2>
                  <div className="flex items-start gap-8">
                    {/* Price Metric */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                          <span className="w-3 h-1 bg-[#0e57b4] rounded-full"></span>
                          <span className="text-xs font-bold text-slate-600">价格</span>
                          <span className={`text-xs font-bold ml-1 ${priceChange >= 0 ? 'text-[#d9001b]' : 'text-green-500'}`}>
                            {priceChange > 0 ? '+' : ''}{priceChangePct.toFixed(2)}%
                          </span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-slate-800 tracking-tight">
                        {currentPrice.toFixed(3)}
                      </div>
                    </div>
                    
                    {/* Secondary Metric: IOPV or Competitor */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                          <span className={`w-3 h-1 rounded-full ${showCompetitor ? 'bg-slate-400' : 'bg-[#fbbf24]'}`}></span>
                          <span className="text-xs font-bold text-slate-600 flex items-center">
                            {showCompetitor ? '竞品' : 'IOPV'}
                            {!showCompetitor && (
                              <span className="ml-1 w-3 h-3 rounded-full border border-slate-300 text-[8px] flex items-center justify-center text-slate-400">i</span>
                            )}
                          </span>
                      </div>
                      <div className="font-mono text-2xl font-medium text-slate-500 tracking-tight">
                        {!showCompetitor ? currentIOPV.toFixed(3) : (selectedCompetitors.length === 1 ? '...' : '...')} 
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Header for Historical */}
              {timeRange !== '实时' && (
                <div className="px-6 pt-6 pb-2">
                  <h2 className="text-sm font-bold text-slate-700 mb-4">业绩走势</h2>
                  <div className="flex justify-between items-start">
                    {/* Left: Latest Info */}
                    <div className="space-y-1">
                       <div className="text-xs text-slate-500 font-mono">{histMetrics.latestDate}</div>
                       <div className="flex items-center gap-2">
                          <span className="w-3 h-1 bg-[#0e57b4] rounded-full"></span>
                          <span className="text-xs font-bold text-slate-600">价格:</span>
                          <span className="font-mono font-bold text-lg text-slate-800">{histMetrics.price}</span>
                       </div>
                    </div>
                    
                    {/* Right: Range Info */}
                    <div className="space-y-1 text-right">
                       <div className="text-xs text-slate-500 font-mono">{histMetrics.start} 至 {histMetrics.end}</div>
                       <div className="flex items-center justify-end gap-2">
                          <span className="text-xs font-bold text-slate-600">区间涨跌幅:</span>
                          <span className={`font-mono font-bold text-lg ${histMetrics.change >= 0 ? 'text-[#d9001b]' : 'text-green-500'}`}>
                            {histMetrics.change > 0 ? '+' : ''}{histMetrics.change.toFixed(2)}%
                          </span>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Chart Area */}
              {/* Reduced height to 220px for smaller proportion */}
              <div className="h-[220px] w-full px-2 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  {timeRange === '实时' ? (
                    // INTRADAY REAL-TIME CHART
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0e57b4" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#0e57b4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#94a3b8', dy: 5}}
                        ticks={['09:30', '11:30', '15:00']}
                        interval={0}
                        tickFormatter={(val) => {
                          if (val === '11:30') return '11:30/13:00';
                          return val;
                        }}
                      />
                      
                      <YAxis 
                        yAxisId="left"
                        domain={yDomain} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#94a3b8'}}
                        tickFormatter={(val) => val.toFixed(3)}
                        width={40}
                      />

                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        domain={yDomain}
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#94a3b8'}}
                        tickFormatter={(val) => {
                          const pct = ((val - preClose) / preClose) * 100;
                          return `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
                        }}
                        width={40}
                      />
                      
                      <Tooltip content={<IntradayTooltip />} isAnimationActive={false} />
                      
                      {/* Self Product */}
                      {showCompetitor ? (
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="value"
                          stroke="#0e57b4"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 4 }}
                          name="我司产品"
                          isAnimationActive={false}
                          animationDuration={0}
                        />
                      ) : (
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0e57b4" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                          name="价格"
                          isAnimationActive={false}
                          animationDuration={0}
                        />
                      )}
                      
                      {/* Secondary: Competitor or IOPV */}
                      {showCompetitor ? (
                        selectedCompetitors.map(code => (
                          <Line
                            key={code}
                            yAxisId="left"
                            type="monotone"
                            dataKey={`competitors.${code}`}
                            stroke="#94a3b8" 
                            strokeWidth={2}
                            dot={false}
                            name={competitors.find(c => c.code === code)?.name}
                            isAnimationActive={false}
                            animationDuration={0}
                          />
                        ))
                      ) : (
                        <Line 
                          yAxisId="left" 
                          type="monotone" 
                          dataKey="iopv" 
                          stroke="#fbbf24" 
                          strokeWidth={1.5} 
                          dot={false}
                          name="IOPV"
                          isAnimationActive={false}
                          animationDuration={0}
                        />
                      )}

                      {/* Invisible line for Right Axis Scaling */}
                      <Line 
                        yAxisId="right" 
                        dataKey="value" 
                        stroke="none" 
                        dot={false} 
                        activeDot={false} 
                        isAnimationActive={false} 
                        animationDuration={0}
                      />

                      {/* Trigger Dot (Restored to simple dot, no tooltip) */}
                      {!showCompetitor && triggerPoint && (
                        <ReferenceDot 
                          key={`trigger-${triggerPoint.time}`}
                          yAxisId="left"
                          x={triggerPoint.time} 
                          y={triggerPoint.value} 
                          r={5} 
                          fill="#ef4444" 
                          stroke="white" 
                          strokeWidth={2}
                        />
                      )}
                    </AreaChart>
                  ) : (
                    // HISTORICAL TREND CHART
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0e57b4" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#0e57b4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#64748b', dy: 5}}
                        ticks={chartData.length > 0 ? [chartData[0].date, chartData[chartData.length - 1].date] : []}
                        interval={0}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis 
                        domain={['auto', 'auto']}
                        axisLine={false} 
                        tickLine={false}
                        tick={{fontSize: 10, fill: '#94a3b8'}}
                        tickFormatter={(val) => `${val.toFixed(2)}%`}
                        width={40}
                      />
                      <Tooltip content={<HistoricalTooltip />} isAnimationActive={false} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '3 3' }} />
                      
                      {/* Self Product */}
                      {showCompetitor ? (
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0e57b4"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                          name="我司产品"
                          isAnimationActive={false}
                          animationDuration={0}
                        />
                      ) : (
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#0e57b4" 
                          strokeWidth={2}
                          fill="url(#colorHist)" 
                          activeDot={{ r: 4, strokeWidth: 0 }}
                          isAnimationActive={false}
                          animationDuration={0}
                        />
                      )}

                      {/* Competitors */}
                      {showCompetitor && selectedCompetitors.map(code => (
                        <Line
                          key={code}
                          type="monotone"
                          dataKey={`competitors.${code}`}
                          stroke="#94a3b8"
                          strokeWidth={2}
                          dot={false}
                          name={competitors.find(c => c.code === code)?.name}
                          isAnimationActive={false}
                          animationDuration={0}
                        />
                      ))}
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* 3. Bottom Tabs */}
              <div className="flex border-t border-slate-200">
                {['实时', '近1月', '近3月', '近6月', '更多'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setTimeRange(t)}
                      className={`flex-1 py-3 text-xs transition-all relative flex items-center justify-center gap-1
                        ${timeRange === t 
                          ? 'text-brand font-bold bg-[#f0f9ff] border-b-2 border-brand' 
                          : 'text-slate-500 font-medium hover:text-brand hover:bg-slate-50'
                        }`}
                    >
                      {t}
                      {t === '更多' && <ChevronDown className="w-3 h-3" />}
                    </button>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600">添加对比:</span>
            {competitors.filter(c => !c.isLeader).map(comp => (
              <button
                key={comp.code}
                onClick={() => handleCompetitorToggle(comp.code)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                  selectedCompetitors.includes(comp.code)
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                <span>VS</span>
                <span>{comp.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Comparison Table (Increased to 7/12) */}
        <div className="col-span-12 lg:col-span-7">
           <div className="bg-white p-6 rounded-md border border-slate-100 shadow-sm h-full">