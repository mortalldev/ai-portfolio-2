import type { ComponentType } from 'react';
import { SiGithub, SiTelegram } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { Mail } from 'lucide-react';

const MAP: Record<string, ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
  telegram: SiTelegram,
  mail: Mail,
};

export function SocialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = MAP[name] ?? Mail;
  return <Icon className={className} aria-hidden />;
}
