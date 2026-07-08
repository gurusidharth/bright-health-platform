import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, Calendar, FileText, Heart, Mail, MapPin, Phone, Pill, Sparkles,
  Thermometer, Activity as ActivityIcon, Wind,
} from "lucide-react";
import { SectionCard } from "@/components/dashboard";
import { getPatientById, riskColor } from "@/lib/data/patients";
import { getCareWorkerById } from "@/lib/data/care-workers";
import { getMedicationsForPatient } from "@/lib/data/medications";
import { getCarePlanForPatient } from "@/lib/data/care-plans";
import { getDocumentsForPatient } from "@/lib/data/documents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/dashboard/patients/$patientId")({
  loader: ({ params }) => {
    const patient = getPatientById(params.patientId);
    if (!patient) throw notFound();
    return patient;
  },
  component: PatientProfilePage,
});

function PatientProfilePage() {
  const patient = Route.useLoaderData();
  const careWorker = getCareWorkerById(patient.assignedCareWorkerId);
  const medications = getMedicationsForPatient(patient.id);
  const carePlan = getCarePlanForPatient(patient.id);
  const documents = getDocumentsForPatient(patient.id);
  const initials = patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <div className="space-y-6">
      <Link to="/dashboard/patients" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Patients
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-primary text-xl font-bold text-white shadow-glow">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{patient.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{patient.age} yrs · {patient.gender} · {patient.mrn}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskColor[patient.risk]}`}>{patient.risk} Risk</span>
              <span className="inline-flex rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{patient.status}</span>
              <span className="inline-flex rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Ward {patient.ward}</span>
            </div>
          </div>
        </div>
        {careWorker && (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white">
              {careWorker.avatarInitials}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Assigned Care Worker</div>
              <div className="text-sm font-semibold">{careWorker.name}</div>
              <div className="text-xs text-muted-foreground">{careWorker.role}</div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles className="h-4 w-4" /> AI Summary</div>
        <p className="mt-2 text-sm text-foreground">{patient.aiSummary}</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
          <TabsTrigger value="careplan">Care Plan</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard title="Personal Details">
              <dl className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
                <dt className="text-muted-foreground">Phone</dt><dd className="flex items-center gap-1.5 font-medium"><Phone className="h-3.5 w-3.5 text-muted-foreground" /> {patient.phone}</dd>
                <dt className="text-muted-foreground">Email</dt><dd className="flex items-center gap-1.5 font-medium"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> {patient.email}</dd>
                <dt className="text-muted-foreground">Address</dt><dd className="flex items-center gap-1.5 font-medium"><MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {patient.address}</dd>
                <dt className="text-muted-foreground">Admitted</dt><dd className="flex items-center gap-1.5 font-medium"><Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {patient.admissionDate}</dd>
              </dl>
            </SectionCard>

            <SectionCard title="Emergency Contact">
              <dl className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
                <dt className="text-muted-foreground">Name</dt><dd className="font-medium">{patient.emergencyContact.name}</dd>
                <dt className="text-muted-foreground">Relation</dt><dd className="font-medium">{patient.emergencyContact.relation}</dd>
                <dt className="text-muted-foreground">Phone</dt><dd className="font-medium">{patient.emergencyContact.phone}</dd>
              </dl>
            </SectionCard>
          </div>

          <SectionCard title="Vitals" subtitle={`Last recorded ${patient.vitals.recordedAt}`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border/60 p-3 text-center">
                <Heart className="mx-auto h-4 w-4 text-destructive" />
                <div className="mt-1 text-lg font-bold">{patient.vitals.bloodPressure}</div>
                <div className="text-xs text-muted-foreground">Blood Pressure</div>
              </div>
              <div className="rounded-xl border border-border/60 p-3 text-center">
                <ActivityIcon className="mx-auto h-4 w-4 text-primary" />
                <div className="mt-1 text-lg font-bold">{patient.vitals.heartRate} bpm</div>
                <div className="text-xs text-muted-foreground">Heart Rate</div>
              </div>
              <div className="rounded-xl border border-border/60 p-3 text-center">
                <Thermometer className="mx-auto h-4 w-4 text-amber-600" />
                <div className="mt-1 text-lg font-bold">{patient.vitals.temperature}°C</div>
                <div className="text-xs text-muted-foreground">Temperature</div>
              </div>
              <div className="rounded-xl border border-border/60 p-3 text-center">
                <Wind className="mx-auto h-4 w-4 text-secondary" />
                <div className="mt-1 text-lg font-bold">{patient.vitals.oxygenSaturation}%</div>
                <div className="text-xs text-muted-foreground">SpO₂</div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="history" className="mt-4 space-y-4">
          <SectionCard title="Conditions">
            <ul className="flex flex-wrap gap-2">
              {patient.conditions.map((c) => (
                <li key={c} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">{c}</li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title="Timeline & Notes">
            {patient.notes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No notes recorded yet.</p>
            ) : (
              <ul className="space-y-3">
                {patient.notes.map((n, i) => (
                  <li key={i} className="rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{n.author}</span>
                      <span>{n.date}</span>
                    </div>
                    <p className="mt-1.5 text-sm">{n.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </TabsContent>

        <TabsContent value="medication" className="mt-4">
          <SectionCard title="Current Medication">
            {medications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active medications.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {medications.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
                      <Pill className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{m.name} {m.dosage}</div>
                      <div className="text-xs text-muted-foreground">{m.frequency} · {m.route}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </TabsContent>

        <TabsContent value="careplan" className="mt-4">
          {carePlan ? (
            <SectionCard title={carePlan.title} subtitle={`${carePlan.completionPercentage}% complete`}>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${carePlan.completionPercentage}%` }} />
              </div>
              <div className="mt-5">
                <h3 className="text-sm font-semibold">Daily Tasks</h3>
                <ul className="mt-2 space-y-1.5">
                  {carePlan.dailyTasks.map((t) => (
                    <li key={t.task} className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                      <span>{t.task}</span>
                      <span className="font-mono text-xs text-muted-foreground">{t.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles className="h-4 w-4" /> AI Recommendations</div>
                <ul className="mt-2 space-y-1 text-sm">
                  {carePlan.aiRecommendations.map((r) => <li key={r}>• {r}</li>)}
                </ul>
              </div>
            </SectionCard>
          ) : (
            <SectionCard title="Care Plan"><p className="text-sm text-muted-foreground">No care plan on file.</p></SectionCard>
          )}
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <SectionCard title="Documents">
            {documents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No documents on file.</p>
            ) : (
              <ul className="divide-y divide-border">
                {documents.map((d) => (
                  <li key={d.id} className="flex items-center gap-3 py-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.uploadedBy} · {d.uploadedDate}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
