import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Download, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Receipt,
  Building
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock payment data
const mockPaymentData = {
  currentRent: 1850,
  nextDueDate: "2024-02-01",
  balance: 0,
  paymentHistory: [
    {
      id: 1,
      date: "2024-01-01",
      amount: 1850,
      type: "Rent",
      status: "paid",
      method: "Credit Card",
      reference: "PAY-2024-001",
      lateFee: 0
    },
    {
      id: 2,
      date: "2023-12-01",
      amount: 1850,
      type: "Rent",
      status: "paid",
      method: "Bank Transfer",
      reference: "PAY-2023-012",
      lateFee: 0
    },
    {
      id: 3,
      date: "2023-11-01",
      amount: 1925,
      type: "Rent",
      status: "paid",
      method: "Credit Card",
      reference: "PAY-2023-011",
      lateFee: 75
    },
    {
      id: 4,
      date: "2023-10-01",
      amount: 1850,
      type: "Rent",
      status: "paid",
      method: "Credit Card",
      reference: "PAY-2023-010",
      lateFee: 0
    },
    {
      id: 5,
      date: "2023-09-15",
      amount: 200,
      type: "Security Deposit",
      status: "paid",
      method: "Bank Transfer",
      reference: "DEP-2023-001",
      lateFee: 0
    }
  ],
  savedPaymentMethods: [
    {
      id: 1,
      type: "credit_card",
      last4: "4242",
      brand: "Visa",
      isDefault: true
    },
    {
      id: 2,
      type: "bank_account",
      last4: "1234",
      bank: "Chase Bank",
      isDefault: false
    }
  ]
}

export default function TenantPayments() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [paymentAmount, setPaymentAmount] = useState(mockPaymentData.currentRent.toString())
  const [paymentMethod, setPaymentMethod] = useState("1")

  const handlePayment = () => {
    toast({
      title: "Payment Processed",
      description: `Payment of $${paymentAmount} has been processed successfully.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case "credit_card":
        return <CreditCard className="h-4 w-4" />
      case "bank_account":
        return <Building className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Payments & Billing
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your rent payments and billing information
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pay">Pay Rent</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Payment Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockPaymentData.currentRent}</div>
                <p className="text-xs text-muted-foreground">
                  Due {mockPaymentData.nextDueDate}
                </p>
                <Button className="w-full mt-3" onClick={() => setActiveTab("pay")}>
                  Pay Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockPaymentData.balance}
                </div>
                <p className="text-xs text-muted-foreground">
                  {mockPaymentData.balance === 0 ? "All caught up!" : "Outstanding balance"}
                </p>
                {mockPaymentData.balance === 0 && (
                  <Badge className="mt-3 bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Paid
                  </Badge>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment History</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockPaymentData.paymentHistory.filter(p => p.status === "paid").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Payments made
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-3" 
                  onClick={() => setActiveTab("history")}
                >
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Your last 3 payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPaymentData.paymentHistory.slice(0, 3).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount}</p>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pay" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>
                  Pay your rent securely online
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="amount">Payment Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="pl-10"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Monthly rent: ${mockPaymentData.currentRent}
                  </p>
                </div>

                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPaymentData.savedPaymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id.toString()}>
                          <div className="flex items-center space-x-2">
                            {getPaymentMethodIcon(method.type)}
                            <span>
                              {method.type === "credit_card" 
                                ? `${method.brand} •••• ${method.last4}`
                                : `${method.bank} •••• ${method.last4}`
                              }
                            </span>
                            {method.isDefault && (
                              <Badge variant="outline" className="ml-2">Default</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Payment Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Rent Amount:</span>
                      <span>${paymentAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total:</span>
                      <span>${paymentAmount}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={handlePayment}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay ${paymentAmount}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your payment is secure and encrypted. You will receive a confirmation email once processed.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All your payment transactions</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPaymentData.paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {payment.status === "paid" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : payment.status === "pending" ? (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{payment.type}</p>
                          {payment.lateFee > 0 && (
                            <Badge variant="outline" className="text-red-600">
                              +${payment.lateFee} late fee
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{payment.date}</p>
                        <p className="text-xs text-gray-400">
                          {payment.method} • Ref: {payment.reference}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${payment.amount}</p>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </div>
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Add Method
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPaymentData.savedPaymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {getPaymentMethodIcon(method.type)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {method.type === "credit_card" 
                            ? `${method.brand} •••• ${method.last4}`
                            : `${method.bank} •••• ${method.last4}`
                          }
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.type === "credit_card" ? "Credit Card" : "Bank Account"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <Badge variant="outline">Default</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
