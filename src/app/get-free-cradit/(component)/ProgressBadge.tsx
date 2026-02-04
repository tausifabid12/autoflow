import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

type Status = 'pending' | 'approved' | 'rejected' | 'not_submitted'

interface ProgressBadgeProps {
  status: Status
}

export function ProgressBadge({ status }: ProgressBadgeProps) {
  const config = {
    not_submitted: {
      label: 'Not Submitted',
      variant: 'secondary' as const,
      icon: null,
      className: undefined,
    },
    pending: {
      label: 'Pending Verification',
      variant: 'default' as const,
      icon: Clock,
      className: undefined,
    },
    approved: {
      label: 'Approved',
      variant: 'default' as const,
      icon: CheckCircle2,
      className: 'bg-green-600 hover:bg-green-700',
    },
    rejected: {
      label: 'Rejected',
      variant: 'destructive' as const,
      icon: XCircle,
      className: undefined,
    },
  }

  const { label, variant, icon: Icon, className } = config[status]

  return (
    <Badge variant={variant} className={className}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {label}
    </Badge>
  )
}
