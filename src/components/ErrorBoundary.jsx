import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error in React tree:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-amber-500/20 text-[#D4AF37] rounded-full flex items-center justify-center mb-4 border border-[#D4AF37]/40 shadow-lg">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black mb-2 font-heading text-[#F5E5C0]">
            Prime Time Typing
          </h1>
          
          <p className="text-slate-300 text-sm max-w-md mb-4 leading-relaxed">
            Something unexpected occurred while loading the page. Tap below to reload and continue.
          </p>

          {this.state.error && (
            <div className="bg-red-950/80 border border-red-500/50 text-red-200 text-xs p-4 rounded-xl max-w-2xl text-left overflow-auto font-mono mb-6 max-h-60">
              <div className="font-bold text-red-400 mb-1">{this.state.error.toString()}</div>
              <pre className="text-[10px] whitespace-pre-wrap">{this.state.error.stack}</pre>
            </div>
          )}

          <button
            onClick={this.handleReload}
            className="flex items-center gap-2 bg-gradient-to-r from-[#F5E5C0] via-[#D4AF37] to-[#9E7D3B] text-slate-950 font-bold px-6 py-3 rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
