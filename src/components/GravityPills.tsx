import { useEffect, useRef } from 'react';
import { Bodies, Body, Composite, Engine, Events, Runner } from 'matter-js';
import { useInView, useReducedMotion } from 'framer-motion';

interface GravityPillsProps {
  items: string[];
}

interface PillBody {
  body: Body;
  element: HTMLSpanElement;
  width: number;
  height: number;
}

const spawnPositions = [0.18, 0.38, 0.58, 0.78, 0.18, 0.38, 0.58, 0.78];
const startAngles = [-0.22, 0.18, -0.14, 0.24, -0.19, 0.12, -0.25, 0.2];

export function GravityPills({ items }: GravityPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const isInView = useInView(containerRef, { once: true, amount: 0.55 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInView || prefersReducedMotion) return;

    let engine: Engine | null = null;
    let runner: Runner | null = null;
    let pillBodies: PillBody[] = [];
    let syncBodies: (() => void) | null = null;
    let resizeFrame = 0;
    let lastWidth = 0;
    let lastHeight = 0;
    let isActive = true;

    const clearSimulation = () => {
      if (engine && syncBodies) Events.off(engine, 'afterUpdate', syncBodies);
      if (runner) Runner.stop(runner);
      if (engine) {
        Composite.clear(engine.world, false, true);
        Engine.clear(engine);
      }

      engine = null;
      runner = null;
      syncBodies = null;
      pillBodies = [];
    };

    const buildSimulation = () => {
      clearSimulation();

      const width = container.clientWidth;
      const height = container.clientHeight;
      const elements = pillRefs.current.filter((pill): pill is HTMLSpanElement => Boolean(pill));

      if (!width || !height || elements.length === 0) return;

      lastWidth = width;
      lastHeight = height;

      engine = Engine.create({ enableSleeping: true });
      engine.gravity.x = 0;
      engine.gravity.y = 1.18;
      engine.gravity.scale = 0.001;
      engine.positionIterations = 12;
      engine.velocityIterations = 10;
      engine.constraintIterations = 4;

      const wallThickness = 80;
      const boundaryOptions = {
        isStatic: true,
        friction: 0.82,
        restitution: 0.18,
      };

      const boundaries = [
        Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 5, boundaryOptions),
        Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 5, boundaryOptions),
        Bodies.rectangle(
          width / 2,
          height + wallThickness / 2 - 2,
          width + wallThickness * 2,
          wallThickness,
          boundaryOptions,
        ),
      ];

      pillBodies = elements.map((element, index) => {
        const pillWidth = element.offsetWidth;
        const pillHeight = element.offsetHeight;
        const halfWidth = pillWidth / 2;
        const unclampedX = width * spawnPositions[index % spawnPositions.length];
        const x = Math.min(width - halfWidth - 5, Math.max(halfWidth + 5, unclampedX));
        const y = -pillHeight - 32 - index * 58;
        const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
          chamfer: { radius: Math.min(pillHeight / 2, 24) },
          density: 0.00135,
          friction: 0.68,
          frictionAir: 0.009,
          restitution: 0.32,
          sleepThreshold: 40,
          slop: 0.02,
        });

        Body.setAngle(body, startAngles[index % startAngles.length]);
        Body.setAngularVelocity(body, index % 2 === 0 ? 0.018 : -0.016);

        element.style.opacity = '0';
        element.style.transform = `translate3d(${x - halfWidth}px, ${y - pillHeight / 2}px, 0) rotate(${body.angle}rad)`;

        return { body, element, width: pillWidth, height: pillHeight };
      });

      Composite.add(engine.world, [...boundaries, ...pillBodies.map(({ body }) => body)]);

      syncBodies = () => {
        pillBodies.forEach(({ body, element, width: pillWidth, height: pillHeight }) => {
          element.style.opacity = '1';
          element.style.transform = `translate3d(${body.position.x - pillWidth / 2}px, ${body.position.y - pillHeight / 2}px, 0) rotate(${body.angle}rad)`;
        });
      };

      Events.on(engine, 'afterUpdate', syncBodies);
      runner = Runner.create({ delta: 1000 / 60 });
      Runner.run(runner, engine);
    };

    const scheduleRebuild = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (isActive) buildSimulation();
      });
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const sizeChanged = Math.abs(width - lastWidth) > 2 || Math.abs(height - lastHeight) > 2;

      if (engine && sizeChanged) scheduleRebuild();
    });

    resizeObserver.observe(container);

    void document.fonts.ready.then(() => {
      if (isActive) buildSimulation();
    });

    return () => {
      isActive = false;
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      clearSimulation();
    };
  }, [isInView, items, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`about-stack-gravity${prefersReducedMotion ? ' is-static' : ''}`}
      aria-hidden="true"
    >
      {items.map((item, index) => (
        <span
          ref={(element) => {
            pillRefs.current[index] = element;
          }}
          className="about-pill about-stack-pill"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
