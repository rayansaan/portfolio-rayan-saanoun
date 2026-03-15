import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader - Liquid Glass Effect
const fragmentShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHoverState;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Distance from mouse
    float dist = distance(uv, uMouse);
    
    // Liquid distortion effect
    float time = uTime * 0.5;
    float noise1 = snoise(uv * 4.0 + time) * 0.015;
    float noise2 = snoise(uv * 8.0 - time * 0.5) * 0.008;
    float distortion = noise1 + noise2;
    
    // Apply distortion near mouse
    float distortionStrength = smoothstep(0.4, 0.0, dist) * uHoverState;
    vec2 distortedUv = uv + vec2(distortion) * distortionStrength;
    
    // Specular highlight (shiny spot)
    float highlightRadius = 0.15 + (1.0 - uHoverState) * 0.25;
    float highlight = smoothstep(highlightRadius, 0.0, dist);
    highlight = pow(highlight, 2.0) * 0.9;
    
    // Secondary glow (larger, softer)
    float glow = smoothstep(0.4, 0.1, dist) * 0.3 * uHoverState;
    
    // Edge glow (liquid glass effect when not hovered)
    float edgeDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float edgeGlow = smoothstep(0.0, 0.15, edgeDist);
    edgeGlow = (1.0 - edgeGlow) * (1.0 - uHoverState) * 0.15;
    
    // Base color (black)
    vec3 baseColor = vec3(0.0);
    
    // Add highlights
    vec3 color = baseColor;
    color += vec3(1.0) * highlight; // Bright white highlight
    color += vec3(1.0) * glow;      // Soft glow
    color += vec3(1.0) * edgeGlow;  // Edge glow
    
    // Subtle color variation for liquid feel
    color += vec3(0.1, 0.12, 0.15) * distortion * distortionStrength * 5.0;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface LiquidGlassMeshProps {
  mousePosition: { x: number; y: number };
  isHovered: boolean;
}

function LiquidGlassMesh({ mousePosition, isHovered }: LiquidGlassMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [hoverState, setHoverState] = useState(0);
  
  const uniforms = useMemo(() => ({
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
    uHoverState: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      
      // Update time
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth transition for hover state
      const targetHover = isHovered ? 1.0 : 0.0;
      setHoverState((prev) => prev + (targetHover - prev) * 0.08);
      material.uniforms.uHoverState.value = hoverState;
      
      // Update mouse position (convert to 0-1 range)
      material.uniforms.uMouse.value.set(
        mousePosition.x,
        1.0 - mousePosition.y // Flip Y for Three.js
      );
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface ButtonLiquidGlassProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ButtonLiquidGlass({ children, onClick, className = '' }: ButtonLiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMobile) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };
  
  // Fallback for mobile (standard button)
  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className={`px-6 py-3 bg-black text-white text-base rounded-lg transition-opacity duration-200 hover:opacity-90 ${className}`}
      >
        {children}
      </button>
    );
  }
  
  return (
    <div
      ref={containerRef}
      className={`relative inline-block border-2 border-black rounded-lg cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ width: '120px', height: '48px' }}
    >
      {/* WebGL Canvas */}
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '6px',
        }}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <LiquidGlassMesh 
          mousePosition={mousePosition} 
          isHovered={isHovered}
        />
      </Canvas>
      
      {/* Text overlay */}
      <span 
        className="absolute inset-0 flex items-center justify-center text-white text-base font-medium pointer-events-none z-10"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
      >
        {children}
      </span>
    </div>
  );
}
